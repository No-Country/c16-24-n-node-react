const { User } = require("../db");

const createUser = async (newUserData) => {
  try {
    const newUser = User.build({
      ...newUserData,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    console.log("Error creating user", error);
    throw error;
  }
};

const getUserByEmail = async (userEmail) => {
  return await User.findOne({ where: { email: userEmail } });
};

module.exports = { createUser, getUserByEmail };
