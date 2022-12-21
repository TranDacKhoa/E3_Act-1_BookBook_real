const seq = require("../database/db");
const models = seq.models;
//const sequelize = seq.sequelize;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userServices = {
  //get all user in database
  getList: async () => {
    try {
      const result = await models.user_info.findAll({
        raw: true,
      });
      return result;
    } catch (err) {
      console.error(err + "\nerror when get users list\n");
      return "error";
    }
  },

  //login signup services
  checkExistUser: async (username) => {
    const result = await models.user_info.findByPk(username);
    if (result === null) {
      return false;
    } else {
      return true;
    }
  },
  checkAdmin: async (username) => {
    const result = await models.user_info.findByPk(username, {
      attributes: ["permission"],
    });
    if (result === null || result.admin !== 1) {
      return false;
    } else {
      return true;
    }
  },
  createHash: async (plain_text) => {
    return await bcrypt.hash(plain_text, saltRounds);
  },
  checkLogin: async (username, pw) => {
    const result = await models.user_info.findByPk(username, {
      attributes: ["pwd"],
    });
    if (result !== null) {
      const dbpw = result.dataValues.pwd;
      const cmp = await bcrypt.compare(pw, dbpw);

      // if username and password match
      if (cmp) {
        return 1;
      }
      // if password doesn't match
      else {
        return 0;
      }
    }
    // if username doesn't exist
    else {
      return -1;
    }
  },
  createNewUser: async (user) => {
    const pwHashed = await module.exports.createHash(user.password);
    const keyHashed = await module.exports.createHash(user.secretkey);
    try {
      const result = await models.user_info.create({
        username: user.username,
        pwd: pwHashed,
        secret_key: keyHashed,
      });
      console.log(`created new user info of ${user.username} successfully\n`);
      return await userServices.createDefaultProfile(user);
    } catch (err) {
      console.log(
        `raise error when create new user info of ${user.username}\n` + err
      );
      return false;
    }
  },
  createDefaultProfile: async (user) => {
    try {
      const result = await models.user_profile.create({
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        gender: user.gender,
        dob: user.dob,
      });
      console.log(
        `created new default profile of ${user.username} successfully\n`
      );
      return true;
    } catch (err) {
      console.log(
        `raise error when create new default profile of ${user.username}\n` +
          err
      );
      return false;
    }
  },
  getUserInfo: async (username) => {
    try {
      const result = await models.user_info.findByPk(username);
      return result.dataValues;
    } catch (err) {
      return null;
    }
  },
  getUserProfile: async (username) => {
    try {
      const result = await models.user_profile.findByPk(username);
      return result.dataValues;
    } catch (err) {
      return null;
    }
  },

  //profile services
  getProfile: async (username) => {
    const result = await models.user_profile.findAll({
      raw: true,
      where: {
        username: username,
      },
    });
    return result;
  },
  getFollowersList: async (username) => {
    const result = await models.follow.findAll({
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
    const result = await models.follow.findAll({
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
  getLibrary: async (username) => {
    const result = await models.user_wall.findAll({
      include: {
        model: models.general_post,
        required: true,
      },
      raw: true,
      where: {
        username: username,
      },
    });
    return result;
  },
  updateProfile: async (user, newUpdate) => {
    try {
      const userInfo = await models.user_profile.findByPk(user);
      if (userInfo !== null) {
        const infoValided = await userInfo.validUpdate(newUpdate);
        const result = await userInfo.set({
          fullname: infoValided.fullname,
          email: infoValided.email,
          dob: infoValided.dob,
          gender: infoValided.gender,
          location: infoValided.location,
          about: infoValided.about,
          avatar: infoValided.avatar,
        });
        await userInfo.save();
        console.log(`updated user ${user} profile successfully\n`);
        return true;
      } else {
        console.log(`user ${user} is not exist\n`);
        return false;
      }
    } catch (err) {
      console.log(`raise error when update user ${user} profile\n${err}`);
      return false;
    }
  },
  postOnWall: async (data) => {
    try {
      const post = await models.general_post.create({
        author_username: data.username,
        img: data.img,
        text: data.content,
      });
      const reslt = await models.user_wall.create({
        username: post.author_username,
        post_id: post.post_id,
      });
      console.log(`posted on ${username} wall\n`);
      return true;
    } catch (err) {
      console.log(`raise error when post on ${username} wall\n `);
      console.log(err);
      return false;
    }
  },
  deleteOnWall: async (postID) => {
    try {
      const delCmt = await models.general_comment.destroy({
        where: {
          cmt_on: postID,
        },
      });
      const delOnWall = await models.user_wall.destroy({
        where: {
          post_id: postID,
        },
      });
      const delPost = await models.general_post.destroy({
        where: {
          post_id: postID,
        },
      });

      console.log(`deleted post${postID} on wall\n`);
      return true;
    } catch (err) {
      console.log(`raise error when delete post ${postID} on wall\n `);
      console.log(err);
      return false;
    }
  },
  comment: async (cmt) => {
    try {
      const result = await models.general_comment.create({
        cmt_by: cmt.username,
        cmt_on: cmt.post_id,
        text: cmt.text,
      });
      console.log(`comment on post ${cmt.post_id}\n`);
      return true;
    } catch (err) {
      console.log(`raise error when omment on post ${cmt.post_id}\n `);
      console.log(err);
      return false;
    }
  },

  //interact services
  startFollow: async (follower, followed) => {
    if (
      (await userServices.checkExistUser(follower)) &&
      (await userServices.checkExistUser(followed))
    ) {
      try {
        const result = await models.follow.create({
          usr_follow: follower,
          usr_followed: followed,
        });
        console.log(`${follower} start following ${followed}\n`);
        return true;
      } catch (err) {
        console.log(`raise error when start follow\n`);
        return false;
      }
    } else {
      console.log(`user is not exist\n`);
      return false;
    }
  },
  unfollow: async (follower, followed) => {
    if (
      (await userServices.checkExistUser(follower)) &&
      (await userServices.checkExistUser(followed))
    ) {
      try {
        const result = await models.follow.destroy({
          where: {
            usr_follow: follower,
            usr_followed: followed,
          },
        });
        console.log(`${follower} unfollow ${followed}\n`);
        return true;
      } catch (err) {
        console.log(`raise error when unfollow\n`);
        return false;
      }
    } else {
      console.log(`user is not exist\n`);
      return false;
    }
  },
};

module.exports = userServices;
