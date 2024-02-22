const usuarioResponseSchema = {
  ok: {
    type: "boolean",
  },
  data: {
    type: "object",
    properties: {
      image: {
        type: "string",
        nullable: true,
      },
      first_name: {
        type: "string",
        nullable: true,
      },
      last_name: {
        type: "string",
        nullable: true,
      },
      description: {
        type: "string",
        nullable: true,
      },
      country: {
        type: "string",
        nullable: true,
      },
      mobilenumber: {
        type: "string",
        nullable: true,
      },
    },
  },
};

const profilePatchPath = {
  patch: {
    tags: ["Profile"],
    summary: "Update profile",
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
              first_name: {
                type: "string",
                optional: true,
                minLength: 2,
                maxLength: 12,
              },
              last_name: {
                type: "string",
                optional: true,
                minLength: 2,
                maxLength: 12,
              },
              description: {
                type: "string",
                optional: true,
                minLength: 2,
                maxLength: 256,
              },
              country: {
                type: "string",
                optional: true,
                minLength: 10,
                maxLength: 40,
              },
              mobilenumber: {
                type: "string",
                optional: true,
                minLength: 10,
                maxLength: 12,
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: "Update correct",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: usuarioResponseSchema,
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
                    message: {
                      type: "string",
                      description: "Nothing to do",
                      example: "Solo aparece cuando el body está vacío (Nothing to do)",
                      nullable: true,
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

const profileGetPath = {
  ...profilePatchPath,
  get: {
    tags: ["Profile"],
    summary: "Get Personal profile",
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    responses: {
      200: {
        description: "You get the profile succesfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: usuarioResponseSchema,
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

const profilePaths = {
  "/api/profile": profileGetPath,
};

module.exports = profilePaths;
