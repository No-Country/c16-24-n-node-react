const { Router } = require("express");
const { searchUser, follow, unfollow } = require("../controllers/users.controller");
const {
  getUserByEmail,
  getUserRecipes,
  getUserByUsernameOrThrow,
} = require("../controllers/user.controller");
const {
  searchUserValidation,
  getUserValidation,
  getUserRecipesValidation,
  followUserValidation,
  unFollowValidation,
} = require("../validations/users.validations");
const { fieldValidator, jwtValidator } = require("../middlewares");
const { responseMessages } = require("../utils/validation-errors.values");

const usersRoutes = Router();
usersRoutes.get(
  "/search",
  [searchUserValidation, fieldValidator],
  async (req, res) => {
    try {
      const { term, page, perPage } = req.query;
      const data = await searchUser(term, page, perPage);
      return res.status(200).json({ ok: true, data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }
);

usersRoutes.get(
  "/:userName",
  [getUserValidation, fieldValidator],
  async (req, res) => {
    try {
      const data = await getUserByUsernameOrThrow(req.params.userName);
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
  }
);

usersRoutes.get(
  "/recipes/:userId",
  [getUserRecipesValidation, fieldValidator],
  async (req, res) => {
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
  }
);

usersRoutes.post(
  "/follow",
  [jwtValidator, followUserValidation, fieldValidator],
  async (req, res) => {
    try {
      const data = await follow(req.body.to_follow_id, req.user.id);
      return res.status(201).json({...data});
    } catch (error) {
      console.log(error);
      if (error.status) {
        return res.status(error.status).json({ ok: false, message: error.msg });
      }
      return res
        .status(500)
        .json({ ok: false, message: responseMessages.internalServerError });
    }
  }
);

usersRoutes.delete(
  "/unfollow",
  [jwtValidator, unFollowValidation, fieldValidator],
  async (req, res) => {
    try {
      const data = await unfollow(req.body.to_follownt_id, req.user.id);
      return res.status(201).json({...data});
    } catch (error) {
      console.log(error);
      if (error.status) {
        return res.status(error.status).json({ ok: false, message: error.msg });
      }
      return res
        .status(500)
        .json({ ok: false, message: responseMessages.internalServerError });
    }
  }
)

module.exports = usersRoutes;
