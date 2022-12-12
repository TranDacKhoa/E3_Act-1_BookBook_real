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
  getFollowingList: async (username) => {
    const result = await models.Follow.findAll({
      include: {
        model: models.UserProfile,
        as: "fled",
        required: true,
      },

      raw: true,
      where: {
        usr_followed: username,
      },
    });
    return result;
  },
  getProfile: async (username) => {
    const result = await models.User.findAll({
      include: { model: models.UserProfile },
      raw: true,
      where: {
        username: "user1",
      },
    });

    return result;
  },
  sendMessage: (user1, user2) => {},
};
