const { authOkResponse } = require("./auth.swagger");

const googleAuthPath = {
  get: {
    tags: ["Google Auth"],
    summary: "Redirects to Google OAuth (Doesn't works here)",
    responses: {
      302: {
        description: "Redirección a Google OAuth, ejecutarla aquí no funciona",
      },
    },
  },
};

const googleRenewPath = {
  get: {
    tags: ["Google Auth"],
    summary: "The route to GET after Google Login or SignIn",
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    responses: {
      200: {
        description: "Todo salió bien :)",
        content: {
          "application/json": {
            schema: authOkResponse,
          },
        },
      },
      401: {
        description: "Error al no tener token o enviar uno invalido.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                ok: {
                  type: "boolean",
                  description: "Indica si la solicitud fue exitosa",
                  example: false,
                },
                message: {
                  type: "string",
                  description: "Error message",
                  examples: [
                    "Token de acceso no proporcionado",
                    "Token de acceso inválido",
                  ],
                },
              },
            },
          },
        },
      },
    },
  },
};

const googleOauthPaths = {
  "/api/auth/google": googleAuthPath,
  "/api/auth/google/renew": googleRenewPath,
};

module.exports = googleOauthPaths;
