const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const attributes = {
    fullname: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "fullname",
      autoIncrement: false,
    },
    username: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "username",
      autoIncrement: false,
      references: {
        key: "username",
        model: "user_info_model",
      },
    },
    gender: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      defaultValue: "unknow",
      comment: null,
      primaryKey: false,
      field: "gender",
      autoIncrement: false,
    },
    location: {
      type: DataTypes.CHAR(250),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "location",
      autoIncrement: false,
    },
    about: {
      type: DataTypes.CHAR(250),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "about",
      autoIncrement: false,
    },
    avatar: {
      type: DataTypes.CHAR(300),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "avatar",
      autoIncrement: false,
    },
  };
  const options = {
    tableName: "user_profile",
    comment: "",
    indexes: [],
    timestamps: false,
  };
  const UserProfileModel = sequelize.define(
    "user_profile_model",
    attributes,
    options
  );
  return UserProfileModel;
};
