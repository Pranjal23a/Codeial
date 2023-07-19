const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports.home = function (req, res) {


    Post.find().populate('user').populate({ path: 'comment', populate: { path: 'user' } })
        .exec().then((posts) => {
            User.find({}).then((users) => {
                return res.render('home', {
                    title: "Codeial | Home",
                    posts: posts,
                    all_users: users
                })
            }).catch((err) => {
                console.log("Error!!", err);
                return;
            })

        })
        .catch((err) => {
            console.log("Error!!", err);
            return;
        })

};
