const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
    Post.findById(req.body.post).then((post) => {
        Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        }).then((comment) => {
            post.comment.push(comment);
            post.save();
            res.redirect('/');
        }).catch((err) => {
            console.log("Error occured!", err);
            return;
        })
    }).catch((err) => {
        console.log("Error occured!", err);
        return;
    })
};

module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id).then((comment) => {
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.deleteOne();
            Post.findByIdAndUpdate(postId, { $pull: { comment: req.params.id } }).then((post) => {
                return res.redirect('back');
            }).catch((err) => {
                return res.redirect('back');
            })
        }
        else {
            return res.redirect('back');
        }
    })
}