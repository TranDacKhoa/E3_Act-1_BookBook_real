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
      autoIncrement: false
    },
    group_name: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "group_name",
      autoIncrement: false
    },
    description: {
      type: DataTypes.CHAR(250),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "description",
      autoIncrement: false
    }
  };
  const options = {
    tableName: "group_info",
    comment: "",
    indexes: []
  };
  const GroupInfoModel = sequelize.define("group_info_model", attributes, options);
  return GroupInfoModel;
};