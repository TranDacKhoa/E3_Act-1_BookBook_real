const userS = require("../services/userServices");

const fullname_regex = /^[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*(?: [A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)*$/
const username_regex = /^(?!\d)(\w){6,}$/
const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const dob_regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/

exports.getLogIn = (req, res, next) => {
  try {
    // if (req.isAuthenticated()) {
    //   res.redirect("/");
    // } else {
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
    //}
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
};

exports.validateLogIn = async (req, res, next) => {
  try {
    if (!username_regex.test(req.body.username) || !password_regex.test(req.body.password)) {
      res.redirect("/login");
    }
    else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

exports.validateSignUp = async (req, res, next) => {
  try {
    switch (req.body.todo){
      case "checkusername": {
        if (!username_regex.test(req.body.username)) {
          res.send(JSON.stringify({ result: 0 }));
        }
        else {
          next();
        }
        
        break;
      }
      case "signup": {
        if (!username_regex.test(req.body.username) || !password_regex.test(req.body.password)
        || !fullname_regex.test(req.body.fullname) || !email_regex.test(req.body.email)
        || !dob_regex.test(req.body.dob)) {
          res.send(JSON.stringify({ result: 0 }));
        }
        else {
          next();
        }

        break;
      }
    }
    
  } catch (err) {
    next(err);
  }
}

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
          email: req.body.email,
          gender: req.body.gender,
          secretkey: req.body.secretkey,
        };
        const createNewUser = await userS.createNewUser(user);

        // if sign up successfully
        if (createNewUser) {
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

exports.renderHome = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } 
  else {
    next();
  }
};
