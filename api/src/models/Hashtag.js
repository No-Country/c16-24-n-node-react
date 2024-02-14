const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Hashtag",
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
        unique: true,
      },

      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { freezeTableName: true, timestamps: true }
  );
};
