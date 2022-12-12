const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "post_id",
      autoIncrement: false
    },
    post_by: {
      type: DataTypes.CHAR(50),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "post_by",
      autoIncrement: false,
      references: {
        key: "username",
        model: "user_profile_model"
      }
    },
    post_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('now'),
      comment: null,
      primaryKey: false,
      field: "post_time",
      autoIncrement: false
    },
    img: {
      type: DataTypes.CHAR(250),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "img",
      autoIncrement: false
    },
    text: {
      type: DataTypes.CHAR(250),
      allowNull: true,
      defaultValue: "insert your caption",
      comment: null,
      primaryKey: false,
      field: "text",
      autoIncrement: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: "0",
      comment: null,
      primaryKey: false,
      field: "price",
      autoIncrement: false
    },
    title: {
      type: DataTypes.CHAR(50),
      allowNull: true,
      defaultValue: "untitled",
      comment: null,
      primaryKey: false,
      field: "title",
      autoIncrement: false
    },
    tag: {
      type: array,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "tag",
      autoIncrement: false
    }
  };
  const options = {
    tableName: "market_post",
    comment: "",
    indexes: []
  };
  const MarketPostModel = sequelize.define("market_post_model", attributes, options);
  return MarketPostModel;
};