const RecipeSchema = {
  type: "object",
  required: [
    "userId",
    "name",
    "primaryimage",
    "description",
    "portion",
    "preparation_time",
    "difficulty",
    "process",
    "ingredients",
    "categories",
    "hashtags",
  ],
  properties: {
    id: {
      type: "string",
      description: "The ID of the recipe",
    },
    userId: {
      type: "string",
      description: "The ID of the user who created the recipe",
    },
    name: {
      type: "string",
      description: "The name of the recipe",
    },
    primaryimage: {
      type: "string",
      description: "The primary image URL of the recipe",
    },
    description: {
      type: "string",
      description: "The description of the recipe",
    },
    portion: {
      type: "integer",
      description: "The number of portions the recipe yields",
    },
    preparation_time: {
      type: "integer",
      description: "The preparation time of the recipe in minutes",
    },
    difficulty: {
      type: "integer",
      description: "The difficulty level of the recipe",
    },
    process: {
      type: "string",
      description: "The preparation process of the recipe",
    },
    hidden: {
      type: "boolean",
      description: "Indicates whether the recipe is hidden or not",
    },
    createdAt: {
      type: "string",
      format: "date-time",
      description: "The timestamp when the recipe was created",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
      description: "The timestamp when the recipe was last updated",
    },
    ingredients: {
      type: "array",
      items: {
        $ref: "#/components/schemas/Ingredient", // Referencia al esquema de ingredientes
      },
      description: "The list of ingredients for the recipe",
    },
    categories: {
      type: "array",
      items: {
        $ref: "#/components/schemas/Category", // Referencia al esquema de categorías
      },
      description: "The list of categories for the recipe",
    },
    hashtags: {
      type: "array",
      items: {
        $ref: "#/components/schemas/Hashtag", // Referencia al esquema de hashtags
      },
      description: "The list of hashtags for the recipe",
    },
  },
};

const ValidationErrorSchema = {
  type: "object",
  properties: {
    ok: {
      type: "boolean",
      description: "Indicates if the request was successful",
      example: false,
    },
    errors: {
      type: "object",
      description: "Object with validation errors",
      properties: {
        field_name: {
          type: "object",
          description: "Description of the error for the field",
          properties: {
            msg: {
              type: "string",
              description: "The error message",
            },
            location: {
              type: "string",
              description: "The location of the field",
            },
            path: {
              type: "string",
              description: "The name of the field",
            },
          },
        },
      },
    },
  },
};

const InternalServerErrorSchema = {
  type: "object",
  properties: {
    ok: {
      type: "boolean",
      description: "Indicates if the request was successful",
      example: false,
    },
    msg: {
      type: "string",
      description: "Error message",
    },
  },
};

module.exports = {
  RecipeSchema,
  ValidationErrorSchema,
  InternalServerErrorSchema,
};
