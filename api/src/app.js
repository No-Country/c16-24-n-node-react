//aplicación
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const { googleOauth } = require("./controllers/oauth-google.controller.js");
const { SWR_CSS_URL } = process.env;
//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./zwagger/config.swagger.js");

require("./db.js");

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(googleOauth.initialize());
server.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, { customCssUrl: SWR_CSS_URL })
);
server.use(cookieParser());
server.use(morgan("dev"));
server.use(cors());

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
