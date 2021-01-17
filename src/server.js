const express = require("express");
const mongoose = require("mongoose");

const app = express();

//Start Server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Great! Server currently running at port ${PORT}`);
});
