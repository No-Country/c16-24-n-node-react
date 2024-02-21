const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const { authOkResponse, authPaths } = require("./auth.swagger");
const googleOauthPaths = require("./oauth-google.swagger")
const profilePaths = require("./profile.swagger")
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
      ...authPaths,
      ...googleOauthPaths,
      ...profilePaths
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
