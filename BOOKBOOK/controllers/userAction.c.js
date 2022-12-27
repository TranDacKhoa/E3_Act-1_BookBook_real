const userS = require("../services/userServices");
const hbsHelpers = require("../helpers/hbs_helpers.js");
const chalk = require("chalk");

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
    if (req.user.username === req.query.username || req.query.username === undefined) {
        const uProfile = await userS.getUserProfile(req.user.username)
        const followers = await userS.getFollowersList(req.user.username)
        const following = await userS.getFollowingList(req.user.username)
        const posts = await userS.getAllPosts(req.user.username);

        res.render('profile', {
            title: uProfile.fullname + " | BookBook",
            user: uProfile,
            userViewed: uProfile,
            followers: followers,
            following: following,
            followedByUser: following,
            helpers: hbsHelpers,
            number_of_posts: posts.length,
            post: posts,
        })
    }
    else {
        next()
    }
  } catch (error) {
    next(error);
  }
};

exports.handleOtherProfile = async (req, res, next) => {
  try {
    const myProfile = await userS.getUserProfile(req.user.username)
    const otherProfile = await userS.getUserProfile(req.query.username)
    const followers = await userS.getFollowersList(req.query.username)
    const following = await userS.getFollowingList(req.query.username)
    const followedByUser = await userS.getFollowingList(req.user.username)

    res.render('profile', {
        title: otherProfile.fullname + " | BookBook",
        user: myProfile,
        userViewed: otherProfile,
        followers: followers,
        following: following,
        followedByUser: followedByUser,
        helpers: hbsHelpers,
    })
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
    res.redirect('/profile')
  } catch (error) {
    next(error);
  }
};


exports.followUser = async (req, res, next) => {
    try {
      console.log(req.body)
      const result = await userS.follow(req.user.username, req.body.user_to_follow)
      if (result) {
          res.send(JSON.stringify({ result: 1 }))
      }
      else {
          res.send(JSON.stringify({ result: 0 }))
      }
    } catch (error) {
        next(error)
    }
}

exports.unfollowUser = async (req, res, next) => {
    try {
      console.log(req.body)
      const result = await userS.unfollow(req.user.username, req.body.user_to_unfollow)
      if (result) {
          res.send(JSON.stringify({ result: 1 }))
      }
      else {
          res.send(JSON.stringify({ result: 0 }))
      }
    } catch (error) {
        next(error)
    }
}

exports.getPostView = async (req, res, next) => {
  try {
    const index = req.body.view;
    const posts = await userS.getAllPosts(req.user.username);
    const post_view = posts[index];
    console.log(post_view);
    res.json({
      img: post_view.dataValues.img,
      content: post_view.dataValues.text,
    });
  } catch (error) {
    next(error);
  }
};
