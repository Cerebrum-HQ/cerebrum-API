const app = require("./app");

const PORT = process.env.PORT || 3000;

//Listening on development mode or production mode

const envName = process.env.ENVNAME;

app.listen(PORT, () => {
  console.log(`Great! Server listening on port ${PORT} in ${envName} mode`);
});
