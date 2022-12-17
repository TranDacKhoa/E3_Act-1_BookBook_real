const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "user_profile",
    {
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "user_info",
          key: "username",
        },
      },
      fullname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "fit@hcmus",
      },
      about: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING(300),
        allowNull: true,
        defaultValue: "./images/user/default_avt.png",
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.fn("now"),
      },
    },
    {
      sequelize,
      tableName: "user_profile",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "user_profile_pkey",
          unique: true,
          fields: [{ name: "username" }],
        },
      ],
    }
  );
};
