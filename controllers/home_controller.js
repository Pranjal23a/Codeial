const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports.home = function (req, res) {


    Post.find().populate('user').populate({ path: 'comment', populate: { path: 'user' } })
        .exec()
        .then((posts) => {
            return res.render('home', {
                title: "Codeial | Home",
                posts: posts
            })
        })
        .catch((err) => {
            console.log("Error!!", err);
            return;
        })

};
