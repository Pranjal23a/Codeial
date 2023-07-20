const User = require("../models/user");

// Showing User profile
module.exports.profile = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    return res.render("profile", {
      title: "User Profile",
      profile_user: user
    });
  } catch (err) {
    console.log("Error!", err);
    return res.status(500).send('Internal Server Error');
  }
}

// Updating User profile
module.exports.update = async function (req, res) {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    return res.redirect('back');
  } catch (err) {
    console.log("Error!", err);
    return res.status(401).send('Unauthorized');
  }
}

// Render the sign up page
module.exports.signUp = async function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  try {
    return res.render("user_sign_up", {
      title: "Codeial | Sign Up",
    });
  } catch (err) {
    console.log("Error!", err);
    return res.status(500).send('Internal Server Error');
  }
}

// Render the signIn page
module.exports.signIn = async function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  try {
    return res.render("user_sign_in", {
      title: "Codeial | Sign In",
    });
  } catch (err) {
    console.log("Error!", err);
    return res.status(500).send('Internal Server Error');
  }
};

// get the sign up data
module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      await User.create(req.body);
      return res.redirect("/users/signIn");
    } else {
      throw new Error("User already exists");
    }
  } catch (err) {
    console.log("Error in signing up:", err);
    return res.redirect("back");
  }
}

// Creating session
module.exports.createSession = async function (req, res) {
  req.flash('success', 'Logged in Successfully!');
  return res.redirect("/");
};

// Destoying session
module.exports.destroySession = async function (req, res) {
  req.logout(function (err) {
    if (err) {
      // Handle any error that occurred during logout
      console.log(err);
      return res.redirect("/"); // or handle the error in an appropriate way
    }
    req.flash('success', 'You have Logged Out!');
    return res.redirect("/");
  });
};
