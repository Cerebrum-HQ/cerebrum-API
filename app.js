const express = require("express");
const cors = require("cors");

//Instantiate app
const app = express();

//Use express.json to parse request body
app.use(express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/", (req, res, next) => {
  res.send("Welcome to CEREBRUM");
  next();
});

module.exports = app;