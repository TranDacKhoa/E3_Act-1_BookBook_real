const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    react_on: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "react_on",
      autoIncrement: false,
      references: {
        key: "post_id",
        model: "general_post_model"
      }
    },
    react_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: "0",
      comment: null,
      primaryKey: false,
      field: "react_type",
      autoIncrement: false
    },
    react_by: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "react_by",
      autoIncrement: false,
      references: {
        key: "username",
        model: "user_profile_model"
      }
    }
  };
  const options = {
    tableName: "reaction",
    comment: "",
    indexes: []
  };
  const ReactionModel = sequelize.define("reaction_model", attributes, options);
  return ReactionModel;
};