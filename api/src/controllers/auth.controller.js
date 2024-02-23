const { createUser, getUserByEmail } = require("./user.controller");
const { responseMessages } = require("../utils/validation-errors.values");
const { signToken } = require("../utils/jwt-auth.helper");
const { SignInMethods } = require("../enums/signin-methods.enum");
const { getCloudinaryResizedImage } = require("../utils/cloudinary.helper");
const { passwordHash, compareHash } = require("../utils/bcrypt.helper");

const emailPasswordSignIn = async (newUserData) => {
  try {
    newUserData.password = await passwordHash(newUserData.password);
    newUserData.signin_method = SignInMethods.email_password;
    const user = await createUser(newUserData);
    const signedToken = signToken({ id: user.id });
    return {
      token: signedToken,
      user_name: user.user_name,
    };
  } catch (error) {
    throw error;
  }
};

const emailPasswordLogIn = async (userCredentials) => {
  try {
    const user = await getUserByEmail(userCredentials.email);
    if (!user) {
      throw { status: 400, msg: responseMessages.userNotRegistered };
    }
    await compareHash(
      userCredentials.password,
      user.password,
      responseMessages.notValidCredentials
    );
    const signedToken = signToken({ id: user.id });
    return {
      token: signedToken,
      user_name: user.user_name,
      image: getCloudinaryResizedImage(user.Profile.image),
    };
  } catch (error) {
    throw error;
  }
};

const renewToken = (userId) => {
  try {
    return signToken({ id: userId });
  } catch (error) {
    throw error;
  }
};

module.exports = { emailPasswordSignIn, emailPasswordLogIn, renewToken };
