const app = require("./app");
const config = require("./config");

//Listening on development mode or production mode
app.listen(config.httpPort, () => {
  console.log(
    `Great! Server listening on port ${config.httpPort} in ${config.envName} mode`
  );
});
