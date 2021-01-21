const app = require("./app");

//Listening on development mode or production mode
const port = process.env.PORT
const envName = process.env.ENVNAME

app.listen(port, () => {
  console.log(
    `Great! Server listening on port ${process.env.PORT} in ${envName} mode`
  );
});
