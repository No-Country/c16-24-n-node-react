const jwt = require("jsonwebtoken");
const { APP_NAME, JWT_EXPIRATION, JWT_SECRET } = process.env;

const signOptions = {
  expiresIn: JWT_EXPIRATION,
  issuer: APP_NAME,
};

const verifyToken = (token) => {
  try {
    const data = jwt.verify(token, JWT_SECRET, {
      maxAge: signOptions.expiresIn,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signToken = (payload) => {
  try {
    return jwt.sign(payload, JWT_SECRET, signOptions);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { signToken, verifyToken };
