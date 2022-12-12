const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    cmt_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "cmt_id",
      autoIncrement: false
    },
    cmt_on: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "cmt_on",
      autoIncrement: false,
      references: {
        key: "post_id",
        model: "general_post_model"
      }
    },
    cmt_by: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "cmt_by",
      autoIncrement: false,
      references: {
        key: "username",
        model: "user_profile_model"
      }
    },
    text: {
      type: DataTypes.CHAR(250),
      allowNull: true,
      defaultValue: "your comment",
      comment: null,
      primaryKey: false,
      field: "text",
      autoIncrement: false
    },
    cmt_time: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: sequelize.fn('now'),
      comment: null,
      primaryKey: false,
      field: "cmt_time",
      autoIncrement: false
    }
  };
  const options = {
    tableName: "general_comment",
    comment: "",
    indexes: []
  };
  const GeneralCommentModel = sequelize.define("general_comment_model", attributes, options);
  return GeneralCommentModel;
};