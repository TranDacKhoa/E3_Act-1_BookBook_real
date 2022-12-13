const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const attributes = {
    email: {
      type: DataTypes.CHAR(250),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "email",
      autoIncrement: false,
    },
    pwd: {
      type: DataTypes.CHAR(250),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "pwd",
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
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: "false",
      comment: null,
      primaryKey: false,
      field: "admin",
      autoIncrement: false,
    },
    secret_key: {
      type: DataTypes.CHAR(250),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "secret_key",
      autoIncrement: false,
    },
  };
  const options = {
    tableName: "user_info",
    comment: "",
    indexes: [],
    timestamps: false,
  };
  const UserInfoModel = sequelize.define(
    "user_info_model",
    attributes,
    options
  );
  return UserInfoModel;
};
