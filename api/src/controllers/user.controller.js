const { User, Profile, Recipe } = require("../db");
const { SignInMethods } = require("../enums/signin-methods.enum");
const { compareHash, passwordHash } = require("../utils/bcrypt.helper");
const { deleteCloudinaryImage } = require("../utils/cloudinary.helper");
const { responseMessages } = require("../utils/validation-errors.values");
const { getCloudinaryResizedImage } = require("../utils/cloudinary.helper");

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
    return await User.findOne({
      where: { id: userId },
      include: [{ model: Profile }],
    });
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

const deleteUser = async (password, userId) => {
  try {
    const user = await getUserById(userId);
    await compareHash(password, user.password);
    user.deleted = true;
    user.email = `deleted_${new Date().getTime()}_@`;
    user.password = `$deleted_`;
    if(!!user.Profile.image){
      await deleteCloudinaryImage(user.Profile.image);
    }
    user.Profile.image = null;
    user.Profile.description = null;
    await user.Profile.save();
    const posts = await Recipe.findAll({ where: { UserId: userId } });
    for (const post of posts) {
      post.hidden = true;
      await post.save();
    }
    await user.save();
    return { ok: true };
  } catch (error) {
    throw error;
  }
};

const getUserRecipes = async (
  userReqId,
  userProfileId,
  page = 1,
  perPage = 9
) => {
  const whereClause = { UserId: userProfileId };

  const _page = page < 1 ? 1 : page;
  const _perPage = perPage > 10 ? 10 : perPage;

  if (userReqId === userProfileId) {
    whereClause.hidden = false;
  }
  try {
    const posts = await Recipe.findAll({
      where: whereClause,
      offset: (_page - 1) * _perPage,
      limit: _perPage,
      order: [["createdAt", "DESC"]],
      attributes: ["id", "primaryimage", "name", "hidden"],
    });
    const responsePosts = posts.map((val) => {
      return {
        id: val.id,
        name: val.name,
        image: getCloudinaryResizedImage(val.primaryimage, 400),
        hidden: val.hidden
      };
    });

    return responsePosts;
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
  updateUserName,
  getUserRecipes,
  deleteUser,
};
