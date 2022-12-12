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
        model: "user_profile_model"
      }
    },
    permission: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: "0",
      comment: null,
      primaryKey: false,
      field: "permission",
      autoIncrement: false
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "blocked",
      autoIncrement: false
    }
  };
  const options = {
    tableName: "group_member",
    comment: "",
    indexes: []
  };
  const GroupMemberModel = sequelize.define("group_member_model", attributes, options);
  return GroupMemberModel;
};