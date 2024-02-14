const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Review",
    {
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5,
        },
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: true }
  );
};
