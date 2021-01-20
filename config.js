/* Create and Export configuration variables
 */

const enviroments = {};

//Staging (default) enviroment
enviroments.staging = {
  httpPort: 3000,
  envName: "staging",
};

//Production envirooment
enviroments.production = {
  httpPort: 5000,
  envName: "production",
};

//Determine which enviroment was passed as a a Command line argument
const currentEnviroment =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

//Check that the current envrioment is one of the enviroment above, if not defaault to staging
const enviromentToExport =
  typeof enviroments[currentEnviroment] == "object"
    ? enviroments[currentEnviroment]
    : enviroments.staging;

module.exports = enviromentToExport;
