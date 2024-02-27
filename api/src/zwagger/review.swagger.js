const {
  RecipeSchema,
  ValidationErrorSchema,
  InternalServerErrorSchema,
} = require("./schemas");

const createReviewPath = {
  post: {
    tags: ["Reviews"],
    summary: "Create a new review",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              recipeId: {
                type: "string",
              },
              description: {
                type: "string",
              },
              rating: {
                type: "integer",
                minimum: 1,
                maximum: 5,
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: "Review created successfully",
        content: {
          "application/json": {
            schema: RecipeSchema,
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

const getReviewsPath = {
  get: {
    tags: ["Reviews"],
    summary: "Get reviews",
    parameters: [
      {
        name: "recipeId",
        in: "query",
        description: "The ID of the recipe",
        schema: {
          type: "string",
        },
        required: false,
      },
    ],
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

const getReviewsByUserPath = {
  get: {
    tags: ["Reviews"],
    summary: "Get reviews by user",
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

const updateReviewPath = {
  patch: {
    tags: ["Reviews"],
    summary: "Update an existing review",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID of the review to update",
        schema: {
          type: "string",
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
        description: "Review updated successfully",
        content: {
          "application/json": {
            schema: RecipeSchema,
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

const deleteReviewPath = {
  delete: {
    tags: ["Reviews"],
    summary: "Delete an existing review",
    parameters: [
      {
        name: "recipeId",
        in: "query",
        required: true,
        description: "ID of the recipe to delete the review from",
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      200: {
        description: "Review deleted successfully",
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

const reviewPaths = {
  "/reviews": { ...createReviewPath, ...getReviewsPath },
  "/reviews/:id": { ...updateReviewPath, ...deleteReviewPath },
};
module.exports = reviewPaths;
