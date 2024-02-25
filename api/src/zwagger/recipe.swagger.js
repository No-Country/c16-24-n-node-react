const {
  RecipeSchema,
  ValidationErrorSchema,
  InternalServerErrorSchema,
} = require("./schemas");

const createRecipePath = {
  post: {
    tags: ["Recipes"],
    summary: "Create a new recipe",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: RecipeSchema,
        },
      },
    },
    responses: {
      201: {
        description: "Recipe created successfully",
        content: {
          "application/json": {
            schema: RecipeSchema,
          },
        },
      },
      400: {
        description: "Bad request, validation errors",
        content: {
          "application/json": {
            schema: ValidationErrorSchema,
          },
        },
      },
      500: {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: InternalServerErrorSchema,
          },
        },
      },
    },
  },
};

const getRecipePath = {
  get: {
    tags: ["Recipes"],
    summary: "Get all recipes",
    responses: {
      200: {
        description: "Successful operation",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: RecipeSchema,
            },
          },
        },
      },
      500: {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: InternalServerErrorSchema,
          },
        },
      },
    },
  },
};

const updateRecipePath = {
  patch: {
    tags: ["Recipes"],
    summary: "Update an existing recipe",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID of the recipe to update",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: RecipeSchema,
        },
      },
    },
    responses: {
      200: {
        description: "Recipe updated successfully",
        content: {
          "application/json": {
            schema: RecipeSchema,
          },
        },
      },
      400: {
        description: "Bad request, validation errors",
        content: {
          "application/json": {
            schema: ValidationErrorSchema,
          },
        },
      },
      404: {
        description: "Recipe not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "Recipe not found",
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
            schema: InternalServerErrorSchema,
          },
        },
      },
    },
  },
};

const deleteRecipePath = {
  delete: {
    tags: ["Recipes"],
    summary: "Delete an existing recipe",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID of the recipe to delete",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
    ],
    responses: {
      204: {
        description: "Recipe deleted successfully",
      },
      404: {
        description: "Recipe not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "Recipe not found",
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
            schema: InternalServerErrorSchema,
          },
        },
      },
    },
  },
};

module.exports = {
  createRecipePath,
  getRecipePath,
  updateRecipePath,
  deleteRecipePath,
};
