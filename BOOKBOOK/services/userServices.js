const seq = require("../database/db");
const models = seq.models;
const sequelize = seq.sequelize;

const userServices = {
  //get all user in database
  getList: async () => {
    try {
      const result = await models.user_info.findAll({
        raw: true,
      });
      return result;
    } catch (err) {
      console.log(err);
      return "error";
    }
  },

  //login signup services
  checkExistUser: async (username) => {
    const result = await models.user_info.findByPk(username);
    if (result === null) return false;
    else {
      return true;
    }
  },
  checkAdmin: async (username) => {
    const result = await models.user_info.findByPk(username, {
      attributes: ["admin"],
    });
    if (result === null || !result.admin) {
      return false;
    } else {
      return true;
    }
  },
  checkLogin: async (username, usrpw) => {
    const result = await models.user_info.findByPk(username, {
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
  createNewUser: async (user) => {
    //hash pwd before insert
    //user.password=hashedpwd
    try {
      result = await models.user_info.create({
        username: user.username,
        pwd: user.password,
        secret_key: user.secretkey,
        email: user.email,
      });
      console.log(`created new user ${user.username} successfully\n`);
      return true;
    } catch (err) {
      console.log(`raise error when create new user ${user.username}\n` + err);
      return false;
    }
  },
  createDefaultProfile: async (username) => {
    if (await userServices.checkExistUser(username)) {
      try {
        const result = await models.user_profile.create({
          username: username,
          fullname: username,
        });
        console.log(`created user ${username} profile successfully\n`);
        return true;
      } catch (err) {
        console.log(`raise error when creat user ${username} profile\n`);
        return false;
      }
    } else {
      console.log(`user ${username} is not exist\n`);
      return false;
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
  updateProfile: async (user, newUpdate) => {
    if (await userServices.checkExistUser(user)) {
      try {
        const result = await models.user_profile.update(
          {
            fullname: newUpdate.fullname,
            gender: newUpdate.gender,
            location: newUpdate.location,
            about: newUpdate.about,
            avatar: newUpdate.avatar,
          },
          {
            where: {
              username: user,
            },
          }
        );
      } catch (err) {
        console.log(`raise error when update user ${user} profile\n`);
        return false;
      }
      console.log(`updated user ${user} profile successfully\n`);
      return true;
    } else {
      console.log(`user ${user} is not exist\n`);
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
