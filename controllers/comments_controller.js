const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
const Like = require('../models/like');

module.exports.create = async function (req, res) {
    try {
        const post = await Post.findById(req.body.post);
        const comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });

        post.comment.push(comment);
        await post.save();

        let commented = await comment.populate([
            { path: 'user', select: 'name email' }
        ]);

        // console.log(commented);
        // commentsMailer.newComment(commented);
        let job = queue.create('emails', commented).save(function (err) {
            if (err) {
                console.log('Error in creating a queue');
            }
            console.log('Job Enqueued', job.id);
        });

        req.flash('success', 'Comment Published!');
        res.redirect('/');
    } catch (err) {
        req.flash('error', err);
        return;
    }
};

module.exports.destroy = async function (req, res) {
    try {
        const comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id) {
            let postId = comment.post;
            await comment.deleteOne();
            await Post.findByIdAndUpdate(postId, { $pull: { comment: req.params.id } });
            await Like.deleteMany({ likeable: comment._id, onModel: 'Comment' });
            req.flash('success', 'Comment Deleted!');
            return res.redirect('back');
        } else {
            req.flash('error', 'You can not delete this comment!!');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
};
