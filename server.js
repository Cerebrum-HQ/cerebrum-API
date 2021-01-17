const express = require("express");
const cors = require("cors");
const config = require("./config");

//Instantiate app
const app = express();

//Use express.json to parse request body
app.use(express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/", (req, res, next) => {
  res.send("<H1>Welcome to CEREBRUM</H1>");
  next();
});

//Listening on development mode or production mode
app.listen(config.httpPort, () => {
  console.log(
    `Great! Server listening on port ${config.httpPort} in ${config.envName} mode`
  );
});
