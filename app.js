const express = require("express");
const cors = require("cors");
const userRouter = require("./src/v1/routes/userRouter");
const teacherRouter = require("./src/v1/routes/teacherRouter");
const schoolRouter = require("./src/v1/routes/schoolRouter")
require("dotenv").config();

//Instantiate app
const app = express();
require("./src/v1/database/database");
//Use express.json to parse request body
app.use(express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(userRouter);
app.use(teacherRouter);
app.use(schoolRouter)

app.use("/", (req, res, next) => {
  // res.statusCode(200);
  res.send("Welcome to CEREBRUM");
  next();
});

module.exports = app;
