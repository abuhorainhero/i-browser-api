const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// ---------- my own ------------
require("dotenv").config();
const db = require("./DB/DB");
const cors = require("cors");

// ----------- Initial Router --------------
const indexRouter = require("./routes/index");
// ---------- My Built Routes --------------
const countryRouter = require("./routes/Country");
const cityRouter = require("./routes/City");
const interestRouter = require("./routes/Interest");
const userRouter = require("./routes/User");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// ---
app.use("/api/country", countryRouter);
app.use("/api/city", cityRouter);
app.use("/api/interest", interestRouter);
app.use("/api/user", userRouter);

module.exports = app;
