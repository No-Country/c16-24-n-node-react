const { Op } = require("sequelize");
const { User, Profile, Folower } = require("../db");
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

const follow = async (followerId, userId) => {
  if (followerId === userId) {
    return res.status(400).json({ error: "No puedes seguirte a ti mismo" });
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const existingFollow = await Folower.findOne({
    where: {
      followerId,
      userId,
    },
  });

  if (existingFollow) {
    return res.status(400).json({ error: "Ya estás siguiendo a este usuario" });
  }

  await Folower.create({
    followerId,
    userId,
  });

  res.status(201).json({ message: "Usuario seguido exitosamente" });
};

module.exports = { searchUser };
