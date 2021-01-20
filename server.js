const app = require("./app");
const config = require("./config");

const PORT = process.env.PORT || config.httpPort;

//Listening on development mode or production mode
app.listen(PORT, () => {
  console.log(
    `Great! Server listening on port ${config.httpPort} in ${config.envName} mode`
  );
});
