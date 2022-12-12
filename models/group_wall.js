const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "group_id",
      autoIncrement: false,
      references: {
        key: "group_id",
        model: "group_info_model"
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
    tableName: "group_wall",
    comment: "",
    indexes: []
  };
  const GroupWallModel = sequelize.define("group_wall_model", attributes, options);
  return GroupWallModel;
};