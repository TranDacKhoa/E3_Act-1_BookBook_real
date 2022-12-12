const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
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
        model: "user_info_model"
      }
    },
    user_blocked: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "user_blocked",
      autoIncrement: false,
      references: {
        key: "username",
        model: "user_profile_model"
      }
    }
  };
  const options = {
    tableName: "user_blocked",
    comment: "",
    indexes: []
  };
  const UserBlockedModel = sequelize.define("user_blocked_model", attributes, options);
  return UserBlockedModel;
};