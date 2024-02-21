const { Profile } = require("../db");
const {
  cloudinary,
  deleteCloudinaryImage,
  getCloudinaryResizedImage,
} = require("../utils/cloudinary.helper");
const deleteFile = require("../utils/delete-file.helper");

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
    return profile;
  } catch (error) {
    throw error;
  }
};

const getProfileByUser = async (userId) => {
  try {
    const profile = await Profile.findOne({ where: { UserId: userId }, attributes:{exclude:["id", "UserId"]} });
    profile.image = getCloudinaryResizedImage(profile.image, 100);
    return profile;
  } catch (error) {
    throw error;
  }
};

const updateProfilePhoto = async (userId, fileName) => {
  try {
    const profile = await Profile.findOne({ where: { UserId: userId } });
    if (!profile) {
      throw { status: 404, message: "Perfil no encontrado" };
    }
    const result = await cloudinary.v2.uploader.upload(`uploads/${fileName}`, {
      allowed_formats: ["jpg", "png", "svg", "webp"],
      tags: ["profile", "avatar"],
      folder: userId,
    });
    await deleteCloudinaryImage(profile.image);
    profile.image = result.secure_url;
    await profile.save();
    return profile;
  } catch (error) {
    throw error;
  } finally {
    deleteFile(fileName);
  }
};

const createProfile = async (userId) => {
  try {
  } catch (error) {}
};

module.exports = { updateProfile, getProfileByUser, updateProfilePhoto };
