const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/mynodeapp")
  .then(() => {
    console.log("Database connected");
  })
  .catch(() => {
    console.log("Database connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images",express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  next();
});

app.use("/api/posts",postRouter);
app.use("/api/user",userRouter);

module.exports = app;