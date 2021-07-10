const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// ------------------- my own -----------------------
require("dotenv").config();
const db = require("./DB/DB");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// --------------- initial setup for live site ---------------
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('Frontend/build'));
    app.get(`*`, (req, res) => {
        res.sendFile(path.resolve(__dirname, "Frontend", "build", "index.html"));
    });
    // app.get("/all-ads", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    // });
    // app.get("/all-interest", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    // });
    // app.get("/users", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    // });
    // app.get("/admin", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    // });
    // app.get("/all-city", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    // });
    // app.get("/all-country", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    // });
    // app.get("/dashboard", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    // });
    // app.get("/login", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    // });
    // app.get("/profile", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    // });
    // app.get("/special-site-revenue", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    // });
    // app.get("/all-site-revenue", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    // });
    // app.get("/all-news", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    // });
    // app.get("/all-withdraw", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    // });
    // app.get("/success-withdraw", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    // });
    // app.get("/reject-withdraw", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    // });
    // app.get("/withdraw-method", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    // });
}

app.use(express.static(path.join(__dirname, "public")));

// ----------- Initial Router --------------
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// ---------- My Built Routes --------------
const countryRouter = require("./routes/Country");
const cityRouter = require("./routes/City");
const interestRouter = require("./routes/Interest");
const userRouter = require("./routes/User");
const bookmarkRouter = require("./routes/Bookmark");
const newsRouter = require("./routes/News");
const withdrawalMethodRouter = require("./routes/WithdrawalMethod");
const withdrawalRequestRouter = require("./routes/WithdrawalRequest");
const adsRouter = require("./routes/Ads")
const viewedAdsRouter = require("./routes/ViewedAds")
const specialRevenueSiteRouter = require("./routes/SpecialRevenueSite")
const otherRevenueSiteRouter = require("./routes/OtherRevenueSite")
const adminRouter = require("./routes/Admin")
const addSiteRevenueRouter = require("./routes/AddSiteRevenue")
// ---
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/city", cityRouter);
app.use("/api/country", countryRouter);
app.use("/api/news", newsRouter);
app.use("/api/interest", interestRouter);
app.use("/api/bookmark", bookmarkRouter);
app.use("/api/withdrawal-method", withdrawalMethodRouter);
app.use("/api/withdrawal-request", withdrawalRequestRouter);

app.use("/api/ads", adsRouter);

app.use("/api/viewed-ads", viewedAdsRouter);

app.use("/api/special-revenue-site", specialRevenueSiteRouter);
app.use("/api/other-revenue-site", otherRevenueSiteRouter);

app.use("/api/add-site-revenue", addSiteRevenueRouter);

module.exports = app;
