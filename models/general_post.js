const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const attributes = {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "post_id",
      autoIncrement: false,
    },
    author_username: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "author_username",
      autoIncrement: false,
      references: {
        key: "username",
        model: "user_profile_model",
      },
    },
    date_post: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn("now"),
      comment: null,
      primaryKey: false,
      field: "date_post",
      autoIncrement: false,
    },
    img: {
      type: DataTypes.CHAR(250),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "img",
      autoIncrement: false,
    },
    text: {
      type: DataTypes.CHAR(250),
      allowNull: true,
      defaultValue: "insert your caption",
      comment: null,
      primaryKey: false,
      field: "text",
      autoIncrement: false,
    },
  };
  const options = {
    tableName: "general_post",
    comment: "",
    indexes: [],
    timestamps: false,
  };
  const GeneralPostModel = sequelize.define(
    "general_post_model",
    attributes,
    options
  );
  return GeneralPostModel;
};
