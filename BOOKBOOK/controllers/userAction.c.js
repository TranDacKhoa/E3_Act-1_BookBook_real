const userS = require("../services/userServices");
const hbsHelpers = require("../helpers/hbs_helpers.js");

exports.getFeed = async (req, res, next) => {
  try {
    const uProfile = await userS.getUserProfile(req.user.username);
    res.render("feed", {
      title: "BookBook",
      user: uProfile,
    });
  } catch (error) {
    next(error);
  }
};

exports.checkPermission = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      if (req.user.permission == 0) {
        next();
      } else if (req.user.permission == 1) {
        res.redirect("/admin");
      } else {
        res.redirect("/block");
      }
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    next(error);
  }
};

exports.handleMyProfile = async (req, res, next) => {
  try {
    if (
      req.query.username === undefined ||
      req.user.username === req.query.username
    ) {
      const uProfile = await userS.getUserProfile(req.user.username);
      console.log(uProfile);
      return res.render("profile", {
        title: uProfile.fullname + " | BookBook",
        user: uProfile,
        userViewed: uProfile,
        helpers: hbsHelpers,
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

exports.handleOtherProfile = async (req, res, next) => {
  try {
    const myProfile = await userS.getUserProfile(req.user.username);
    const otherUserProfile = await userS.getUserProfile(req.query.username);
    res.render("profile", {
      title: otherUserProfile.fullname + " | BookBook",
      user: myProfile,
      userViewed: otherUserProfile,
      helpers: hbsHelpers,
    });
  } catch (error) {
    next(error);
  }
};
exports.checkOwner = async (req, res, next) => {
  try {
    if (req.user.username) {
      next();
    } else {
      res.status(403).redirect("/error");
    }
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    if (req.file) {
      let list = req.file.path.split("\\");
      req.body.avatar = list[list.length - 1];
    }
    const result = await userS.updateProfile(req.user.username, req.body);
    next();
  } catch (error) {
    next(error);
  }
};
