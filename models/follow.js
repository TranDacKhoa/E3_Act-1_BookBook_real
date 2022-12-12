const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const attributes = {
    usr_follow: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "usr_follow",
      autoIncrement: false,
      references: {
        key: "username",
        model: "user_profile_model",
      },
    },
    usr_followed: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "usr_followed",
      autoIncrement: false,
      references: {
        key: "username",
        model: "user_profile_model",
      },
    },
  };
  const options = {
    tableName: "follow",
    comment: "",
    indexes: [],
    timestamps: false,
  };
  const FollowModel = sequelize.define("follow_model", attributes, options);
  return FollowModel;
};
