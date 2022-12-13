var DataTypes = require("sequelize").DataTypes;
const _User = require("./user_info");
const _UserProfile = require("./user_profile");
const _Follow = require("./follow");
const _GeneralPost = require("./general_post");
const _UserWall = require("./user_wall");
function initModels(sequelize) {
  var User = _User(sequelize, DataTypes);
  var UserProfile = _UserProfile(sequelize, DataTypes);
  var Follow = _Follow(sequelize, DataTypes);
  var GeneralPost = _GeneralPost(sequelize, DataTypes);
  var UserWall = _UserWall(sequelize, DataTypes);

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

  //user_wall x general_post
  UserWall.hasOne(GeneralPost, {
    sourceKey: "post_id",
    foreignKey: "post_id",
  });
  GeneralPost.belongsTo(UserWall, {
    foreignKey: "post_id",
  });

  //

  //

  return {
    User,
    UserProfile,
    Follow,
    GeneralPost,
    UserWall,
  };
}
module.exports = initModels;
