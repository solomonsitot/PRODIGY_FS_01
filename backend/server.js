const DBconnection = require("./config/db_con");
const userRoute = require("./routes/userRoutes");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const express = require("express");
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
