const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Profile",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      image: {
        type: DataTypes.STRING,
      },

      first_name: {
        type: DataTypes.STRING,
      },

      last_name: {
        type: DataTypes.STRING,
      },

      description: {
        type: DataTypes.STRING,
      },

      country: {
        type: DataTypes.TEXT,
      },
    
      mobilenumber: {
        type: DataTypes.INTEGER,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};
