const { Router } = require("express");
const {
  profileValidationSchema,
} = require("../validations/profile.validations");
const {
  updateProfile,
  getProfileByUser,
  updateProfilePhoto,
} = require("../controllers/profile.controller");
const {
  jwtValidator,
  emptyBodyValidator,
  fieldValidator,
  imageValidator,
} = require("../middlewares");

const profileRouter = new Router();

profileRouter.patch(
  "/",
  [jwtValidator, profileValidationSchema, emptyBodyValidator, fieldValidator],
  async (req, res) => {
    try {
      await updateProfile(req.body, req.user.id);
      return res.status(200).json({ ok: true });
    } catch (error) {
      console.log(error);
      if (error.status) {
        return res.status(error.status).json({ ok: false, message: error.msg });
      }
      return res
        .status(500)
        .json({ ok: false, message: "Server Error, please try again later." });
    }
  }
);

profileRouter.get("/", [jwtValidator], async (req, res) => {
  try {
    const data = await getProfileByUser(req.user.id);
    return res.status(200).json({ ok: true, data });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, msg: "Server Error, please try again later." });
  }
});

profileRouter.patch(
  "/photo",
  [jwtValidator, imageValidator, fieldValidator],
  async (req, res) => {
    try {
      const profile = await updateProfilePhoto(req.user.id, req.file.filename);
      return res.json({ ok: true, profile });
    } catch (error) {
      console.log(error);
      if (error.status || error.http_code) {
        return res.status(error.status || error.http_code).json({ ok: false, message: error.message });
      }
      return res
        .status(500)
        .json({ ok: false, message: "Server Error, please try again later." });
    }
  }
);

profileRouter.post("/change-password", (req, res) => {
  try {
  } catch (error) {}
});

module.exports = profileRouter;