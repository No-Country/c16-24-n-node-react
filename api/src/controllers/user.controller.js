const { User, Profile } = require("../db");
const { SignInMethods } = require("../enums/signin-methods.enum");
const { compareHash, passwordHash } = require("../utils/bcrypt.helper");
const { responseMessages } = require("../utils/validation-errors.values");

const createUser = async (newUserData) => {
  try {
    const newUser = User.build({
      ...newUserData,
    });
    await newUser.save();
    await Profile.create({ UserId: newUser.id });
    return newUser;
  } catch (error) {
    console.log("Error creating user", error);
    throw error;
  }
};

const getUserByEmail = async (userEmail) => {
  return await User.findOne({
    where: { email: userEmail },
    include: [{ model: Profile }],
  });
};

const getUserById = async (userId) => {
  try {
    return await User.findOne({ where: { id: userId } });
  } catch (error) {
    throw { status: 400, msg: responseMessages.userNotRegistered };
  }
};

const updatePassword = async (newPasswordData, userId) => {
  try {
    const { password, new_password } = newPasswordData;
    const user = await getUserById(userId);
    if (user.signin_metgod == SignInMethods.email_password) {
      await compareHash(password, user.password);
    }
    user.password = await passwordHash(new_password);
    await user.save();
    return {
      ok: true,
      message: responseMessages.updatedPassword,
    };
  } catch (error) {
    throw error;
  }
};

const updateEmail = async (newEmailData, userId) => {
  try {
    const { email, password } = newEmailData;
    const user = await getUserById(userId);
    if (!user.password) {
      throw { ok: false, msg: responseMessages.blockEmailUpdate };
    }
    await compareHash(password, user.password);
    user.email = email;
    await user.save();
    return {
      ok: true,
      message: responseMessages.updatedEmail,
    };
  } catch (error) {
    throw error;
  }
};

const updateUserName = async (newUserData, userId) => {
  try {
    const { user_name } = newUserData;
    const user = await getUserById(userId);
    user.user_name = user_name;
    await user.save();
    return {
      ok: true,
      message: responseMessages.updatedUserName,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updatePassword,
  updateEmail,
  updateUserName
};
