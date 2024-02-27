const { Router } = require("express");
const { searchUser } = require("../controllers/users.controller");
const {
  getUserByEmail,
  getUserRecipes,
  getUserByUsernameOrThrow,
} = require("../controllers/user.controller");
const { searchUserValidation, getUserValidation, getUserRecipesValidation } = require("../validations/users.validations");
const { fieldValidator } = require("../middlewares");

const usersRoutes = Router();
usersRoutes.get("/search", [searchUserValidation, fieldValidator], async (req, res) => {
  try {
    const { term, page, perPage } = req.query;
    const data = await searchUser(term, page, perPage);
    return res.status(200).json({ ok: true, data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false });
  }
});

usersRoutes.get("/:userName", [getUserValidation, fieldValidator], async (req, res) => {
  try {
    const user = await getUserByUsernameOrThrow(req.params.userName);
    return res.status(200).json({ ok: true, user });
  } catch (error) {
    console.log(error);
    if (error.status) {
      return res.status(error.status).json({ ok: false, message: error.msg });
    }
    return res
      .status(500)
      .json({ ok: false, message: responseMessages.internalServerError });
  }
});

usersRoutes.get("/recipes/:userId", [getUserRecipesValidation, fieldValidator], async (req, res) => {
  try {
    const data = await getUserRecipes(null, req.params.userId);
    return res.status(200).json({ ok: true, data });
  } catch (error) {
    console.log(error);
    if (error.status) {
      return res.status(error.status).json({ ok: false, message: error.msg });
    }
    return res
      .status(500)
      .json({ ok: false, message: responseMessages.internalServerError });
  }
});

module.exports = usersRoutes;