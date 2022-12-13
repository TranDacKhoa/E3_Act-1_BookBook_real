const seq = require("../models/index");
const models = seq.models;
const sequelize = seq.sequelize;
module.exports = {
  getList: async () => {
    const result = await models.User.findAll({
      raw: true,
    });
    return result;
  },
  getFollowersList: async (username) => {
    const result = await models.Follow.findAll({
      include: {
        model: models.UserProfile,
        as: "following",
        required: true,
      },

      raw: true,
      where: {
        usr_followed: username,
      },
    });
    return result;
  },
  getFollowingList: async (username) => {
    const result = await models.Follow.findAll({
      include: {
        model: models.UserProfile,
        as: "followed",
        required: true,
      },
      raw: true,
      where: {
        usr_follow: username,
      },
    });
    return result;
  },
  getProfile: async (username) => {
    const result = await models.UserProfile.findAll({
      raw: true,
      where: {
        username: username,
      },
    });
    return result;
  },
  //login signup services
  checkExistUser: async (username) => {
    const result = await models.User.findByPk(username);
    if (result === null) return false;
    else {
      return true;
    }
  },
  checkAdmin: async (username) => {
    const result = await models.User.findByPk(username, {
      attributes: ["admin"],
    });
    if (result === null || !result.admin) {
      return false;
    } else {
      return true;
    }
  },
  checkLogin: async (username, usrpw) => {
    const result = await models.User.findByPk(username, {
      attributes: ["pwd"],
    });
    // hash usrpw before compare
    if (result !== null) {
      const dbpw = result.pwd;
      return usrpw === dbpw;
    } else {
      return false;
    }
  },
  getLibrary: async (username) => {
    const result = await models.UserWall.findAll({
      include: {
        model: models.GeneralPost,
        required: true,
      },
      raw: true,
      where: {
        username: username,
      },
    });
    return result;
  },
  createNewUser: async (username, password, secretkey, email) => {
    const result = await models.User.create({
      username: username,
      pwd: password,
      secret_key: secretkey,
      email: email,
    });
    return result;
  },
};
