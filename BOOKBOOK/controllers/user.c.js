const userS = require("../services/userServices");

exports.getLogIn = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      errorUnMsg = "";
      errorPwMsg = "";
      if (req.session.errorUnMsg) {
        errorUnMsg = req.session.errorUnMsg;
      }
      if (req.session.errorPwMsg) {
        errorPwMsg = req.session.errorPwMsg;
      }
      delete req.session.errorUnMsg;
      delete req.session.errorPwMsg;
      res.render("login", {
        title: "Log In | BookBook",
        layout: "account.hbs",
        errorUnMsg: errorUnMsg,
        errorPwMsg: errorPwMsg,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getSignUp = (req, res, next) => {
  try {
    res.render("signup", {
      title: "Sign Up | BookBook",
      layout: "account.hbs",
    });
  } catch (error) {
    next(error);
  }
};

exports.postLogIn = async (req, res, next) => {
  if (req.isAuthenticated()) {
    // if this is admin account
    if (req.user.permission == 1) {
      res.redirect("/admin");
    }
    // if this is user account
    else if (req.user.permission == 0) {
      res.redirect("/");
    }
    // if account has been blocked
    else {
      req.logout((err) => {
        if (err) {
          return next(err);
        }
      });
      res.redirect("/block");
    }
  } else {
    console.log("not authenticated");
    let isExist = await userS.checkExistUser(req.body.username);
    if (!isExist) {
      req.session.errorUnMsg = "Username does not exist";
    } else {
      req.session.errorPwMsg = "Wrong password";
    }

    res.redirect("/login");
  }
};

exports.postSignUp = async (req, res, next) => {
  try {
    switch (req.body.todo) {
      case "checkusername": {
        const isExist = await userS.checkExistUser(req.body.username);

        if (isExist) {
          res.send(JSON.stringify({ result: 0 }));
        } else {
          res.send(JSON.stringify({ result: 1 }));
        }

        break;
      }

      case "signup": {
        const user = {
          username: req.body.username,
          password: req.body.password,
          fullname: req.body.fullname,
          dob: req.body.dob,
          gender: req.body.gender,
          secretkey: req.body.secretkey,
        };
        console.log(user);
        const newUser = await userS.createNewUser(user);

        // if sign up successfully
        if (newUser) {
          res.send(JSON.stringify({ result: 1 }));
        }
        // if error
        else {
          res.send(JSON.stringify({ result: 0 }));
        }
      }
    }
  } catch (err) {
    next(err);
  }
};

exports.logOut = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
  }
  res.redirect("/login");
};
