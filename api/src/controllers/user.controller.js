const { User, Profile } = require("../db");

const createUser = async (newUserData) => {
  try {
    const newUser = User.build({
      ...newUserData,
    });
    await newUser.save();
    await Profile.create({UserId:newUser.id});
    return newUser;
  } catch (error) {
    console.log("Error creating user", error);
    throw error;
  }
};

const getUserByEmail = async (userEmail) => {
  return await User.findOne({ where: { email: userEmail },include: [
    { model: Profile }, // Carga los posts del usuario
  ], });
};

const getUserById = async (userId) =>{
  return await User.findOne({where: { id: userId }})
}

module.exports = { createUser, getUserByEmail, getUserById };
