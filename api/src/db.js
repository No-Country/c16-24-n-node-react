// conexion a la base de datos
require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_PG_URL, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  DB_PG_URL,
  //`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?ssl=true`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    dialect: "postgres",
    dialectModule: require("pg"),
    dialectOptions: {
      ssl: { require: true },
    },
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
const {
  Category,
  Favorite,
  Folower,
  Hashtag,
  Ingredient,
  Like,
  Profile,
  Recipe,
  Review,
  User,
} = sequelize.models;

// Aca vendrian las relaciones

//?-----Relaciones de Receta-----//

//Relacion Receta con Categoria
Recipe.belongsToMany(Category, { through: "RecipeCategory" });
Category.belongsToMany(Recipe, { through: "RecipeCategory" });

//Relacion Receta con Ingrediente
// Recipe.belongsToMany(Ingredient, { through: "RecipeIngredient" });
// Ingredient.belongsToMany(Recipe, { through: "RecipeIngredient" });

//Relacion entre Receta y Hashtag
Recipe.belongsToMany(Hashtag, { through: "RecipeHashtag" });
Hashtag.belongsToMany(Recipe, { through: "RecipeHashtag" });

//Relacion entre Receta y Usuario
Recipe.belongsTo(User);
User.hasMany(Recipe);

//?-----Relaciones de Review-----//
// Review con User
User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

// Review con Recipe
Recipe.hasMany(Review, { foreignKey: "recipeId" });
Review.belongsTo(Recipe, { foreignKey: "recipeId" });

//?-----Relaciones de Perfil-----//
//Perfil con Usuario
User.hasOne(Profile);
Profile.belongsTo(User);

//?-----Relaciones de Favoritos-----//
User.belongsToMany(Recipe, {
  through: "Favorite",
  as: "FavoriteRecipes",
  foreignKey: "userId",
});
Recipe.belongsToMany(User, {
  through: "Favorite",
  as: "UsersFavorites",
  foreignKey: "recipeId",
});

//?-----Relaciones de Likes-----//
User.belongsToMany(Recipe, {
  through: "Like",
  as: "LikedRecipes",
  foreignKey: "userId",
});
Recipe.belongsToMany(User, {
  through: "Like",
  as: "UsersLiked",
  foreignKey: "recipeId",
});

//?-----Relaciones de Followers-----//

User.belongsToMany(User, {
  through: "Follower",
  as: "Followers",
  foreignKey: "userId",
  otherKey: "followerId",
});
User.belongsToMany(User, {
  through: "Follower",
  as: "Following",
  foreignKey: "followerId",
  otherKey: "userId",
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
}; // conexion a la base de datos
