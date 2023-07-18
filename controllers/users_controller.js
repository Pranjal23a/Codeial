const User = require("../models/user");

// Showing User profile
module.exports.profile = function (req, res) {
  // if (req.cookies.user_id) {
  //   User.findById(req.cookies.user_id)
  //     .then((user) => {
  //       if (user) {
  //         return res.render("profile", {
  //           title: "User Profile",
  //           user: user,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       // Handle any errors that occur during the query
  //       console.error(err);
  //       return res.redirect("/users/signIn");
  //     });
  // } else {
  //   return res.redirect("/users/signIn");
  // }
  return res.render("profile", {
    title: "User Profile",
  });
};

// Render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

// Remder the signup page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

// get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return User.create(req.body);
      } else {
        throw new Error("User already exists");
      }
    })
    .then((user) => {
      return res.redirect("/users/signIn");
    })
    .catch((err) => {
      console.log("Error in signing up:", err);
      return res.redirect("back");
    });
};

// sign in and create session for the user
// module.exports.createSession = async function (req, res) {
//   try {
//     // steps to authenticate
//     // find the user
//     const user = await User.findOne({ email: req.body.email });

//     // handle user found
//     if (user) {
//       // handle password which don't match
//       if (user.password != req.body.password) {
//         return res.redirect("back");
//       }

//       // handle session creation
//       res.cookie("user_id", user.id);
//       return res.redirect("/users/profile");
//     } else {
//       // handle user not found
//       return res.redirect("back");
//     }
//   } catch (err) {
//     console.log("Error in finding user in signing in!!");
//     // handle the error appropriately
//     return res.status(500).send("Internal Server Error");
//   }
// };
module.exports.createSession = function (req, res) {
  return res.redirect("/users/profile");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      // Handle any error that occurred during logout
      console.log(err);
      return res.redirect("/"); // or handle the error in an appropriate way
    }

    return res.redirect("/");
  });
};
