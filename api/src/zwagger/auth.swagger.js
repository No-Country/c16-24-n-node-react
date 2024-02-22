const authOkResponse = {
  title: "AuthOkResponse",
  type: "object",
  properties: {
    ok: {
      type: "boolean",
      description: "Si todo sale bien 'ok', caso contrario 'false'",
    },
    user: {
      type: "object",
      description: "Datos del usuario",
      properties: {
        token: {
          type: "string",
          description: "El JWT",
        },
        user_name: {
          type: "string",
          description: "El Nombre de usuario del usuario",
        },
        image: {
          type: "string",
          description:
            "EL URL de la imagen del usuario con width=100px (puede ser undefined)",
          example: "undefined",
          nullable:true
        },
      },
    },
  },
};

const authSigninPath = {
  post: {
    tags: ["Auth"],
    summary: "Sign in a user with email and password",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string",
                description: "The user's email address",
                example: "sdasd@dasd.co",
              },
              password: {
                type: "string",
                description: "The user's password",
                minLength: 10,
                maxLength: 24,
                example: "asdasdsd",
              },
              user_name: {
                type: "string",
                description: "The user's username",
                minLength: 2,
                maxLength: 24,
                example: "sadasd",
              },
            },
            required: ["email", "password", "user_name"],
          },
        },
      },
    },
    responses: {
      201: {
        description: "Sign-in successful, user data returned",
        content: {
          "application/json": {
            schema: authOkResponse,
          },
        },
      },
      400: {
        description: "Bad request, validation errors",
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
                errors: {
                  type: "object",
                  description: "Objeto con los errores de validación",
                  properties: {
                    field_name: {
                      type: "object",
                      description: "Descripción del error para el campo 1",
                      properties: {
                        msg: {
                          type: "string",
                          description: "El mensaje de error",
                          example: "Debe tener entre 10 y 24 caracteres",
                        },
                        location: {
                          type: "string",
                          description: "La locacíon del campo",
                          example: "body",
                        },
                        path: {
                          type: "string",
                          description: "El nombre del campo",
                          example: "password",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      500: {
        description: "Internal server error",
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
                },
              },
            },
          },
        },
      },
    },
  },
};

const authLoginPath = {
  post: {
    tags: ["Auth"],
    summary: "Login with email and password",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string",
                description: "The user's email address",
                example: "sdasd@dasd.co",
              },
              password: {
                type: "string",
                description: "The user's password",
                minLength: 10,
                maxLength: 24,
                example: "asdasdsd",
              },
            },
            required: ["email", "password"],
          },
        },
      },
    },
    responses: {
      201: {
        description: "Sign-in successful, user data returned",
        content: {
          "application/json": {
            schema: authOkResponse,
          },
        },
      },
      400: {
        description: "Bad request, validation errors",
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
                  description: "La razón del error",
                  example: "Email o contraseña no válidos.",
                },
              },
            },
          },
        },
      },
      500: {
        description: "Internal server error",
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
                msg: {
                  type: "string",
                  description: "Error message",
                },
              },
            },
          },
        },
      },
    },
  },
};

const renewTokenPath = {
  get: {
    tags: ["Auth"],
    summary: "Renews JWT",
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    responses: {
      200: {
        description: "Devuelve el nuevo token",
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

const authPaths = {
  "/api/auth/signin": authSigninPath,
  "/api/auth/login": authLoginPath,
  "/api/auth/renew-token": renewTokenPath,
};

module.exports = {
  authPaths,
  authOkResponse,
};
