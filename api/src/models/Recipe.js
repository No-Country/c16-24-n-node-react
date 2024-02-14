const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      primaryimage: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      portion: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      preparation_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      process: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { freezeTableName: true, timestamps: true }
  );
};
