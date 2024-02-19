const { verifyToken } = require("../utils/jwt-auth.helper");
const { responseMessages } = require("../utils/validation-errors.values");

const tokenValidator = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ ok: false, message: responseMessages.noJwt });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ ok: false, message: responseMessages.invalidJwt });
  }
};

module.exports = tokenValidator;
