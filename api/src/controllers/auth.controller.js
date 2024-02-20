const bcrypt = require("bcrypt");
const { createUser, getUserByEmail } = require("./user.controller");
const { responseMessages } = require("../utils/validation-errors.values");
const { signToken } = require("../utils/jwt-auth.helper");
const { SignInMethods } = require("../enums/signin-methods.enum");

const passwordHash = async (password) => {
  const salt = bcrypt.genSaltSync();
  return await bcrypt.hash(password, salt);
};

const emailPasswordSignIn = async (newUserData) => {
  try {
    newUserData.password = await passwordHash(newUserData.password);
    newUserData.signin_method = SignInMethods.email_password;
    const user = await createUser(newUserData);
    return signToken({ id: user.id });
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
    const isPassword = await bcrypt.compare(
      userCredentials.password,
      user.password
    );
    if (!isPassword) {
      throw { status: 400, msg: responseMessages.notValidCredentials };
    }
    return signToken({ id: user.id });
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
