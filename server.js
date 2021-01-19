const app = require("./app");
// const config = require("./config");

const port = process.env.PORT || 3000

//Listening on development mode or production mode
app.listen(port, () => {
  console.log(
    // `Great! Server listening on port ${config.httpPort} in ${config.envName} mode`
    `listening on port ${port}`
  );
});
