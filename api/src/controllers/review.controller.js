const { Review, Recipe, User } = require("../db");

const postReview = async (recipeId, userId, description, rating) => {
  if (!recipeId || !description || !rating || userId)
    throw Error("Faltan datos");

  const recipeExist = await Recipe.findOne({ where: { id: recipeId } });

  const checkExistReview = await Review.findAll({
    where: {
      UserId: userId,
      RecipeId: recipeExist.id,
    },
  });
  if (checkExistReview.length > 0) throw Error("Ya existe la Review");

  const newReview = await Review.create({
    description,
    rating,
    RecipeId: recipeId,
    UserId: userId,
  });
  return newReview;
};

const updateReview = async (id, updatedAttributes, userId) => {
  
  const review = await Review.findByPk(id);

  if (!review) {
    throw Error("Reseña no encontrado");
  }

  if (review.UserId !== userId) {
    throw Error("La reseña sólo puede ser modificada por su autor")
  }

  if (updatedAttributes.rating) {
    review.rating = updatedAttributes.rating;
  }

  if (updatedAttributes.description) {
    review.description = updatedAttributes.description;
  }

  // Guardar los cambios en la base de datos
  await review.save();

  return review;
};

const getReviewsWithAverageRating = async (recipeId) => {
  const allReview = await Review.findAll(
    {
      where: {
        RecipeId: recipeId,
      },
    },
    {
      include: [{ model: User, attributes: ["name"] }],
    }
  );

  // Calcular el promedio de calificaciones
  const averageRating = await Review.findOne({
    attributes: [
      [
        Review.sequelize.fn("avg", Review.sequelize.col("rating")),
        "averageRating",
      ],
    ],
  });

  // Calcular el promedio o establecerlo en 0 si no hay reseñas
  const calculatedAverage = averageRating
    ? averageRating.getDataValue("averageRating")
    : 0;

  return {
    reviews: allReview,
    averageRating: calculatedAverage,
  };
};

const getReviewsByUser = async (userId) => {
  const allReview = await Review.findAll(
    {
      where: {
        UserId: userId,
      },
    },
    {
      include: [{ model: Recipe, attributes: ["name"] }],
    }
  );
  return allReview;
};

const deleteReview = async (recipeId) => {
  await Review.destroy({ where: { Id: recipeId } });

  // Obtener las reviews restantes
  const remainingReviews = await Review.findAll();

  return remainingReviews;
};

module.exports = {
  postReview,
  updateReview,
  getReviewsWithAverageRating,
  getReviewsByUser,
  deleteReview,
};
