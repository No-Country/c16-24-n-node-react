const { Op } = require("sequelize");
const { User, Profile, Follower } = require("../db");
const { getCloudinaryResizedImage } = require("../utils/cloudinary.helper");
const searchUser = async (searchTerm, page = 1, perPage = 5) => {
  const _page = page < 1 ? 1 : page;
  const _perPage = perPage > 10 ? 10 : perPage;
  try {
    const users = await User.findAll({
      include: {
        model: Profile,
        attributes: ["first_name", "last_name", "image"],
      },
      where: {
        [Op.or]: [
          { user_name: { [Op.iLike]: `%${searchTerm}%` } },
          { "$Profile.first_name$": { [Op.iLike]: `%${searchTerm}%` } },
          { "$Profile.last_name$": { [Op.iLike]: `%${searchTerm}%` } },
        ],
        deleted: false,
      },
      offset: (_page - 1) * _perPage,
      limit: _perPage,
    });
    const results = users.map((user) => {
      return {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
        profile: {
          first_name: user.Profile.first_name,
          last_name: user.Profile.last_name,
          image: getCloudinaryResizedImage(user.Profile.image, 50),
        },
      };
    });
    return results;
  } catch (error) {
    throw error;
  }
};

const follow = async (toFollowId, myUserId) => {
  try {
    if (toFollowId === myUserId) {
      throw { status: 400, msg: "No puedes seguirte a ti mismo" };
    }

    const user = await User.findOne({
      where: {
        id: toFollowId,
        deleted: false,
        banned: false,
      },
    });
    if (!user) {
      throw { status: 404, msg: "Usuario no encontrado o baneado" };
    }

    const existingFollow = await Follower.findOne({
      where: {
        followerId: myUserId,
        userId: toFollowId,
      },
    });

    if (existingFollow) {
      throw { status: 400, msg: "Ya estás siguiendo a este usuario" };
    }

    await Follower.create({
      followerId: myUserId,
      userId: toFollowId,
    });

    return { message: "Usuario seguido exitosamente" };
  } catch (error) {
    throw error;
  }
};

const unfollow = async (toUnfollowId, myUserId) => {
  try {
    const existingFollow = await Follower.findOne({
      where: {
        followerId: myUserId,
        userId: toUnfollowId,
      },
    });

    if (!existingFollow) {
      throw { status: 400, msg: "No estás siguiendo a este usuario" };
    }

    await Follower.destroy({
      where: {
        followerId: myUserId,
        userId: toUnfollowId,
      },
    });

    return { message: "Follow eliminado exitosamente" };
  } catch (error) {
    throw error;
  }
};

module.exports = { searchUser, follow, unfollow };
