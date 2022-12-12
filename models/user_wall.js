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
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "post_id",
      autoIncrement: false,
      references: {
        key: "post_id",
        model: "general_post_model"
      }
    }
  };
  const options = {
    tableName: "user_wall",
    comment: "",
    indexes: []
  };
  const UserWallModel = sequelize.define("user_wall_model", attributes, options);
  return UserWallModel;
};