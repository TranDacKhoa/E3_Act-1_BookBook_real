var DataTypes = require("sequelize").DataTypes;
var _User = require("./user_info");
var _UserProfile = require("./user_profile");
var _Follow = require("./follow");

function initModels(sequelize) {
  var User = _User(sequelize, DataTypes);
  var UserProfile = _UserProfile(sequelize, DataTypes);
  var Follow = _Follow(sequelize, DataTypes);
  //user_profile
  User.hasOne(UserProfile, {
    foreignKey: "username",
  });
  UserProfile.belongsTo(User, {
    foreignKey: "username",
  });

  //user_profile x follow
  UserProfile.belongsToMany(UserProfile, {
    as: "flw",
    foreignKey: "usr_follow",
    through: Follow,
  });
  UserProfile.belongsToMany(UserProfile, {
    as: "flwed",
    foreignKey: "usr_followed",
    through: Follow,
  });

  Follow.belongsTo(UserProfile, {
    as: "following",
    foreignKey: "usr_follow",
  });
  Follow.belongsTo(UserProfile, {
    as: "followed",
    foreignKey: "usr_followed",
  });
  UserProfile.hasMany(Follow, { as: "following", foreignKey: "usr_follow" });
  UserProfile.hasMany(Follow, {
    as: "followed",
    foreignKey: "usr_followed",
  });
  //

  return {
    User,
    UserProfile,
    Follow,
  };
}
module.exports = initModels;
