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
        model: "market_post_model"
      }
    },
    cmt_by: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "cmt_by",
      autoIncrement: false
    },
    cmt_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('now'),
      comment: null,
      primaryKey: false,
      field: "cmt_time",
      autoIncrement: false
    },
    text: {
      type: DataTypes.CHAR(250),
      allowNull: true,
      defaultValue: "your comment",
      comment: null,
      primaryKey: false,
      field: "text",
      autoIncrement: false
    }
  };
  const options = {
    tableName: "market_comment",
    comment: "",
    indexes: []
  };
  const MarketCommentModel = sequelize.define("market_comment_model", attributes, options);
  return MarketCommentModel;
};