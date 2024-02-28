const likeCreatePath = {
  post: {
    tags: ["Likes"],
    summary: "Dar/quitar like a una receta",
    description: "Permite a un usuario dar o quitar like a una receta.",
    parameters: [
      {
        in: "path",
        name: "recipeId",
        description: "ID de la receta a la que se quiere dar/quitar like.",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        in: "header",
        name: "Authorization",
        description: "Token de autorización JWT.",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      201: {
        description: "Like dado/quitar con éxito.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                like: {
                  type: "boolean",
                },
              },
            },
          },
        },
      },
      500: {
        description: "Error interno del servidor.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};

const likeGetPath = {
  get: {
    tags: ["Likes"],
    summary: "Obtener likes de una receta",
    description: "Obtiene la cantidad de likes de una receta.",
    parameters: [
      {
        in: "path",
        name: "recipeId",
        description: "ID de la receta de la que se quiere obtener los likes.",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      200: {
        description: "Likes obtenidos con éxito.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                likes: {
                  type: "integer",
                },
              },
            },
          },
        },
      },
      500: {
        description: "Error interno del servidor.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};

const likePaths = {
  "/api/recipe/:recipeId/likes": likeGetPath,
  "/api/recipe/:recipeId/like": likeCreatePath,
};

module.exports = likePaths;
