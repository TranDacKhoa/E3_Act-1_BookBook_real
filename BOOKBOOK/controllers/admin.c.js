const adminS = require("../services/adminServices");
const userS = require("../services/userServices");
const hbsHelpers = require("../helpers/hbs_helpers.js");

exports.checkPermission = async (req, res, next) => {
    try {
      if (req.isAuthenticated()) {
        if (req.user.permission == 1) {
          next();
        } else if (req.user.permission == 0) {
          res.redirect("/");
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

exports.redirectAdmin = async (req, res, next) => {
  try {
    res.redirect("/admin/post")
  } catch (error) {
    next(error);
  }
};

exports.renderReportPost = async (req, res, next) => {
  try {
    const adminProf = await userS.getUserProfile(req.user.username)
    
    res.render("report_post", {
      title: adminProf.fullname + " | BookBook",
      user: adminProf,
      layout: "admin",
      helpers: hbsHelpers,
    });
  } catch (error) {
    next(error);
  }
};

exports.renderReportUser = async (req, res, next) => {
  try {
    const adminProf = await userS.getUserProfile(req.user.username)

    res.render("report_user", {
      title: adminProf.fullname + " | BookBook",
      user: adminProf,
      layout: "admin",
      helpers: hbsHelpers,
    });
  } catch (error) {
    next(error);
  }
};