const { Router } = require("express");
const {jwtValidator, emptyBodyValidator} = require("../middlewares/index")

const reviewsRoutes = Router();

const {
  getReviewsWithAverageRating,
  getReviewsByUser,
  postReview,
  deleteReview,
  updateReview,
} = require("../controllers/review.controller");

reviewsRoutes.post("/", [jwtValidator, emptyBodyValidator], async (req, res) => {
  try {
    const { recipeId } = req.query;
    const { description, rating } = req.body;
    const userId = req.user.id;

    const reviewPost = await postReview(recipeId, userId, description, rating);

    res.status(201).json(reviewPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

reviewsRoutes.delete("/delete", [jwtValidator], async (req, res) => {
  try {
    const { reviewId } = req.query;
    const remainingReviews = await deleteReview(reviewId);

    res.status(200).json(remainingReviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

reviewsRoutes.get("/", async (req, res) => {
  const { recipeId } = req.query;
  try {
    const allReviews = await getReviewsWithAverageRating(recipeId);
    return res.status(200).json(allReviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

reviewsRoutes.get("/", [jwtValidator], async (req, res) => {
  const userId = req.user.id;
  try {
    const allReviews = await getReviewsByUser(userId);
    return res.status(200).json(allReviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

reviewsRoutes.patch("/:reviewId", [jwtValidator], async (req, res) => {
  try {
    const updatedAttributes = req.body;
    const userId = req.user.id;
    const updatedReview = await updateReview(req.params.reviewId, updatedAttributes, userId);
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = reviewsRoutes;
