const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const { authSigninPath, authOkResponse, authLoginPath, googleAuthPath, renewTokenPath } = require("./auth.swagger");

const swaggerDefinition = {
  definition: {
    openapi:"3.1.0",
    info: {
      title: "chetifabene API",
      version: "1.0.0",
    },
    host: "api.example.com",
    basePath: "/",
    tags: [],
    paths: {
      "/api/auth/signin": authSigninPath,
      "/api/auth/login":authLoginPath,
      "/api/auth/google":googleAuthPath,
      "/api/auth/renew-token":renewTokenPath
    },
    definitions: { "AuthOkResponse": authOkResponse },
    components:{
      securitySchemes:{
        apiKeyAuth:{
          type: "apiKey",
          in: "header",
          name: "authorization",
          description: "Token de authentication"
        }
      },
    },
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

const swaggerSpecs = swaggerJSDoc(swaggerDefinition);
module.exports = swaggerSpecs;
