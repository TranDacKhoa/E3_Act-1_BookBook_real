const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_profile', {
    fullname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user_info',
        key: 'username'
      }
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "unknow"
    },
    location: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    about: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_profile',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_profile_pkey",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
};
