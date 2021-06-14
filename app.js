const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// ---------- my own ------------
require("dotenv").config();
const db = require("./DB/DB");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


// ----------- Initial Router --------------
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// ---------- My Built Routes --------------
const countryRouter = require("./routes/Country");
const cityRouter = require("./routes/City");
const interestRouter = require("./routes/Interest");
const userRouter = require("./routes/User");
const bookmarkRouter = require("./routes/Bookmark")
// ---
app.use("/api/country", countryRouter);
app.use("/api/city", cityRouter);
app.use("/api/interest", interestRouter);
app.use("/api/user", userRouter);
app.use("/api/bookmark", bookmarkRouter);

module.exports = app;
