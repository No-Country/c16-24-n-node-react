const updateUsuarioSchema = {
  ok: {
    type: "boolean",
  },
  message: {
    type: "string",
  },
};

const userUpdatePassPath = {
  put: {
    tags: ["User"],
    summary: "Update password",
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              password: {
                type: "string",
                description: "The user's password",
                minLength: 10,
                maxLength: 24,
                example: "asdasdsd",
              },
              new_password: {
                type: "string",
                description: "The user's new password",
                minLength: 10,
                maxLength: 24,
                example: "asdasdsd",
              },
              new_password_confirm: {
                type: "string",
                description: "The user's new password confirm",
                minLength: 10,
                maxLength: 24,
                example: "asdasdsd",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Update correct",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: updateUsuarioSchema,
            },
          },
        },
      },
      400: {
        description: "Bad request, validation errors or empty body",
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
                          example: "El mensaje de error",
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

const userUpdateEmailPath = {
  put: {
    tags: ["User"],
    summary: "Update email",
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              password: {
                type: "string",
                description: "The user's password",
                minLength: 10,
                maxLength: 24,
                example: "asdasdsd",
              },
              email: {
                type: "string",
                description: "The user's email address",
                example: "sdasd@dasd.co",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Update correct",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: updateUsuarioSchema,
            },
          },
        },
      },
      400: {
        description: "Bad request, validation errors or empty body",
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
                          example: "El mensaje de error",
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

const userUpdateUserNamePath = {
  put: {
    tags: ["User"],
    summary: "Update user name",
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_name: {
                type: "string",
                description: "El Nombre de usuario del usuario",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Update correct",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: updateUsuarioSchema,
            },
          },
        },
      },
      400: {
        description: "Bad request, validation errors or empty body",
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
                          example: "El mensaje de error",
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

const userRecipesPath = {
  get: {
    tags: ["User"],
    summary: "Get personal recipes",
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    parameters: [
      {
        name: "page",
        in: "query",
        description: "The page number",
        type: "integer",
        minimum: 1,
      },
      {
        name: "perPage",
        in: "query",
        description: "The number of posts per page.",
        type: "integer",
        minimum: 1,
        maximum: 10,
      },
    ],
    responses: {
      200: {
        description: "Update correct",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties:{
                data:{
                  type:"array",
                  items:{
                    type:"object",
                    properties:{
                      id:{
                        type:"string"
                      },
                      name:{
                        type:"string"
                      },
                      image: {
                        type:"string",
                        description:"Image URL. Width 400px"
                      }
                    },
                  }
                }
              }

            },
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

const userDeletePath = {
  delete: {
    tags: ["User"],
    summary: "Delete my user",
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              password: {
                type: "string",
                description: "The user's password",
                minLength: 10,
                maxLength: 24,
                example: "asdasdsd",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Update correct",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                ok:{
                  type:"boolean",
                  example: true,
                }
              },
            },
          },
        },
      },
      400: {
        description: "Bad request, validation errors or empty body",
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
                          example: "El mensaje de error",
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

const userPaths = {
  "/api/user/change-password": userUpdatePassPath,
  "/api/user/change-email": userUpdateEmailPath,
  "/api/user/change-user": userUpdateUserNamePath,
  "/api/user/recipes": userRecipesPath,
  "/api/user": { ...userDeletePath },
};

module.exports = userPaths;
