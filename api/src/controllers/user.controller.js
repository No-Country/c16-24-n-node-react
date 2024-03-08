const { User, Profile, Recipe, Like } = require("../db");
const { SignInMethods } = require("../enums/signin-methods.enum");
const { compareHash, passwordHash } = require("../utils/bcrypt.helper");
const { deleteCloudinaryImage } = require("../utils/cloudinary.helper");
const { responseMessages } = require("../utils/validation-errors.values");
const { getCloudinaryResizedImage } = require("../utils/cloudinary.helper");
const { col, fn } = require("sequelize");

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

const getUserByUsernameOrThrow = async (userName) => {
  try {
    const user = await User.findOne({
      where: { user_name: userName },
      attributes: [
        "id",
        "user_name",
        "email",
        [fn("COUNT", col("Recipes.UserId")), "recipeCount"],
      ],
      subQuery: false,
      group: ["User.id", "Profile.id"],
      include: [
        {
          model: Profile,
          attributes: [
            "first_name",
            "last_name",
            "country",
            "description",
            "image",
          ],
        },
        {
          model: Recipe,
          as: "Recipes",
          where: { hidden: false },
          attributes: [],
          required: false,
        },
      ],
    });
    if (!user) {
      throw { status: 400, msg: responseMessages.userNotRegistered };
    }
    return {
      id: user.id,
      user_name: user.user_name,
      recipesCount: user.dataValues.recipeCount,
      ...user.Profile.dataValues,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updatePassword = async (newPasswordData, userId) => {
  try {
    const { password, new_password } = newPasswordData;
    const user = await getUserById(userId);
    if (user.signin_method == SignInMethods.email_password) {
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
    if (!!user.Profile.image) {
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
  userProfileName,
  page = 1,
  perPage = 9
) => {
  const _page = page < 1 ? 1 : page;
  const _perPage = perPage > 10 ? 10 : perPage;

  try {
    const posts = await Recipe.findAll({
      include: {
        model: User,
        attributes: ["user_name"],
      },
      where: {
        "$User.user_name$": userProfileName,
        hidden: false,
      },
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
      };
    });

    return responsePosts;
  } catch (error) {
    throw error;
  }
};

const getUserLikes = async (userId, page = 1, perPage = 10) => {
  const _page = page < 1 ? 1 : page;
  const _perPage = perPage > 10 ? 10 : perPage;

  try {
    const user = User.findOne({
      where:{
        id:userId,
        deleted:false,
      }
    });
    if(!user){
      throw {status:404, msg:responseMessages.userNotRegistered}
    }
    const data = Like.findAll({
      where:{
        userId,
        isDeleted:false,
      },
      attributes:[],
      include: [
        {
          model:Recipe,
          where:{
            hidden: false,
          },
          attributes:["id", "primaryimage", "name", "description", "createdAt"],
        },
        {
          model:User,
          attributes:["id","user_name"]
        }
      ],
      offset: (_page - 1) * _perPage,
      limit: _perPage,
      order: [["createdAt", "DESC"]],
    });
    return data;

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
  getUserByUsernameOrThrow,
  getUserLikes,
};
