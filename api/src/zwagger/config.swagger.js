const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const {
  authSigninPath,
  authOkResponse,
  authLoginPath,
  googleAuthPath,
  renewTokenPath,
} = require("./auth.swagger");
const { createRecipePath } = require("./recipe.swagger");
const { SWR_CSS_URL1, SWR_CSS_URL2, SWR_JS_URL1, SWR_JS_URL2 } = process.env;

const swaggerDefinition = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "chetifabene API",
      version: "1.0.0",
    },
    host: "api.example.com",
    basePath: "/",
    tags: [],
    paths: {
      "/api/auth/signin": authSigninPath,
      "/api/auth/login": authLoginPath,
      "/api/auth/google": googleAuthPath,
      "/api/auth/renew-token": renewTokenPath,
      "/api/recipes": createRecipePath,
    },
    definitions: { AuthOkResponse: authOkResponse },
    components: {
      securitySchemes: {
        apiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "authorization",
          description: "Token de authentication",
        },
      },
    },
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

const swaggerUiSpecs = {
  customJs: [SWR_JS_URL1, SWR_JS_URL2],
  customCssUrl: [SWR_CSS_URL1, SWR_CSS_URL2],
};

const swaggerSpecs = swaggerJSDoc(swaggerDefinition);
module.exports = { swaggerSpecs, swaggerUiSpecs };
