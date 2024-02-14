const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Like",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { freezeTableName: true, timestamps: true }
  );
};
