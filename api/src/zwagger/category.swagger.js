const {
  CategorySchema,
  ValidationErrorSchema,
  InternalServerErrorSchema,
} = require("./schemas");

const categoryPaths = {
  "/api/categories/": {
    post: {
      tags: ["Categories"],
      summary: "Create a new category",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: CategorySchema,
          },
        },
      },
      responses: {
        201: {
          description: "Category created successfully",
          content: {
            "application/json": {
              schema: CategorySchema,
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
      tags: ["Categories"],
      summary: "Get all categories",
      responses: {
        200: {
          description: "Successful operation",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: CategorySchema,
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
  "/api/categories/:categoryId": {
    get: {
      tags: ["Categories"],
      summary: "Get a category by ID",
      parameters: [
        {
          name: "categoryId",
          in: "path",
          description: "ID of the category",
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
              schema: CategorySchema,
            },
          },
        },
        404: {
          description: "Category not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Category not found",
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
      tags: ["Categories"],
      summary: "Update an existing category",
      parameters: [
        {
          name: "categoryId",
          in: "path",
          required: true,
          description: "ID of the category to update",
          schema: {
            type: "integer",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: CategorySchema,
          },
        },
      },
      responses: {
        200: {
          description: "Category updated successfully",
          content: {
            "application/json": {
              schema: CategorySchema,
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
          description: "Category not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Category not found",
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
      tags: ["Categories"],
      summary: "Delete an existing category",
      parameters: [
        {
          name: "categoryId",
          in: "path",
          required: true,
          description: "ID of the category to delete",
          schema: {
            type: "integer",
          },
        },
      ],
      responses: {
        204: {
          description: "Category deleted successfully",
        },
        404: {
          description: "Category not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Category not found",
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

module.exports = categoryPaths;
