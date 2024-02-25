const { User } = require("../db");

const userId = async (userName) => {
  try {
    const userNameLowerCase = userName.toLowerCase();
    const user = await User.findOne({
      where: {
        user_name: userNameLowerCase,
      },
    });

    if (user) {
      return user.id;
    } else {
      throw new Error("Usuario no encontrada");
    }
  } catch (error) {
    throw new Error("Error al buscar el usuario: " + error.message);
  }
};

module.exports = userId;
