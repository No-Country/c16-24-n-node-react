const { Profile } = require("../db");

const updateProfile = async (profileData, userId) => {
  const { first_name, last_name, description, country, mobilenumber } =
    profileData;

  try {
    const profile = await Profile.findOne({ where: { UserId: userId } });

    if (!profile) {
      throw { status: 404, msg: "Perfil no encontrado" };
    }
    profile.first_name = first_name;
    profile.last_name = last_name;
    profile.description = description;
    profile.country = country;
    profile.mobilenumber = mobilenumber;
    await profile.save();
  } catch (error) {
    throw error;
  }
};

const getProfileByUser = async (userId) => {
  try {
    return await Profile.findOne({ where: { UserId: userId } });
  } catch (error) {
    throw error;
  }
};

module.exports = { updateProfile, getProfileByUser };
