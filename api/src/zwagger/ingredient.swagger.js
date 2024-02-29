const {
  IngredientSchema,
  ValidationErrorSchema,
  InternalServerErrorSchema,
} = require("./schemas");

const ingredientPaths = {
  "/api/ingredients/": {
    post: {
      tags: ["Ingredients"],
      summary: "Create a new ingredient",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: IngredientSchema,
          },
        },
      },
      responses: {
        201: {
          description: "Ingredient created successfully",
          content: {
            "application/json": {
              schema: IngredientSchema,
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
    get: {
      tags: ["Ingredients"],
      summary: "Get all ingredients",
      responses: {
        200: {
          description: "Successful operation",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: IngredientSchema,
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
  },
  "/api/ingredients/:ingredientId": {
    get: {
      tags: ["Ingredients"],
      summary: "Get an ingredient by ID",
      parameters: [
        {
          name: "ingredientId",
          in: "path",
          description: "ID of the ingredient",
          schema: {
            type: "integer",
          },
          required: true,
        },
      ],
      responses: {
        200: {
          description: "Successful operation",
          content: {
            "application/json": {
              schema: IngredientSchema,
            },
          },
        },
        404: {
          description: "Ingredient not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Ingredient not found",
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
    patch: {
      tags: ["Ingredients"],
      summary: "Update an existing ingredient",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: IngredientSchema,
          },
        },
      },
      responses: {
        200: {
          description: "Ingredient updated successfully",
          content: {
            "application/json": {
              schema: IngredientSchema,
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
          description: "Ingredient not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Ingredient not found",
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
    delete: {
      tags: ["Ingredients"],
      summary: "Delete an existing ingredient",
      parameters: [
        {
          name: "ingredientId",
          in: "path",
          required: true,
          description: "ID of the ingredient to delete",
          schema: {
            type: "integer",
          },
        },
      ],
      responses: {
        204: {
          description: "Ingredient deleted successfully",
        },
        404: {
          description: "Ingredient not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Ingredient not found",
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
  },
};

module.exports = ingredientPaths;
