const { Router } = require("express");
const {
  profileValidationSchema,
} = require("../validations/profile.validations");
const fieldValidator = require("../middlewares/field-validator.middleware");
const tokenValidator = require("../middlewares/jwt.middleware");
const {
  updateProfile,
  getProfileByUser,
} = require("../controllers/profile.controller");

const router = new Router();

router.patch(
  "/profile",
  [profileValidationSchema, fieldValidator, tokenValidator],
  async (req, res) => {
    try {
      await updateProfile(req.body, req.user.id);
      return res.status(200).json({ ok: true });
    } catch (error) {
      console.log(error);
      if (error.status) {
        return res.status(error.status).json({ ok: false, msg: error.msg });
      }
      return res
        .status(500)
        .json({ ok: false, msg: "Server Error, please try again later." });
    }
  }
);

router.get("/profile", [tokenValidator], async (req, res) => {
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

module.exports = router;
