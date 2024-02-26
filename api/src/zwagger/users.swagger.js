const { response400, response40X, response500 } = require("./user.swagger");

const usersSearchPath = {
  get: {
    tags: ["Users"],
    summary: "Search users by first_name, last_name and user_name",
    parameters: [
      {
        name: "term",
        in: "query",
        required: true,
        description: "The search term",
        type: "string",
        minLength: 2,
        maxLength: 24,
      },
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
              properties: {
                ok: {
                  type: "boolean",
                  example: true,
                },
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      user_name: {
                        type: "string",
                      },
                      Profile: {
                        type: "object",
                        properties: {
                          first_name: {
                            type: "string",
                          },
                          last_name: {
                            type: "string",
                          },
                          etc: {
                            type: "string",
                            description: "the rest of profile fields",
                            example: "the rest of profile fields",
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
      },
      400: response400,
      401: response40X,
      500: response500,
    },
  },
};

const usersByUNamePath = {
  get: {
    tags: ["Users"],
    summary: "Get user by userName",
    parameters: [
      {
        name: "userName",
        in: "path",
        required: true,
        description: "The user's userName",
        type: "string",
        minLength: 2,
        maxLength: 24,
      },
    ],
    responses: {
      200: {
        description: "Update correct",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                ok: {
                  type: "boolean",
                  example: true,
                },
                user: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                    user_name: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    Profile: {
                      type: "object",
                      properties: {
                        first_name: {
                          type: "string",
                        },
                        last_name: {
                          type: "string",
                        },
                        etc: {
                          type: "string",
                          description: "the rest of profile fields",
                          example: "the rest of profile fields",
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
      400: response400,
      401: response40X,
      500: response500,
    },
  },
};

const usersRecipesPath = {
  get: {
    tags: ["Users"],
    summary: "Get user recipes recipes",
    parameters: [
      {
        name: "userId",
        in: "path",
        description: "The user Id",
        type: "UUID",
        required: true
      },
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
              properties: {
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      name: {
                        type: "string",
                      },
                      image: {
                        type: "string",
                        description: "Image URL. Width 400px",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      401: response40X,
      500: response500,
    },
  },
};

const usersPaths = {
  "/api/users/search": usersSearchPath,
  "/api/users/{userName}": usersByUNamePath,
  "/api/users/recipes/{userId}":usersRecipesPath,
};

module.exports = usersPaths;
