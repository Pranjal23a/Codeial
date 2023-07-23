const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function (req, res) {

    let posts = await Post.find().sort('-createdAt').populate('user').populate({ path: 'comment', populate: { path: 'user' } })
    return res.status(200).json({
        message: "List of Posts",
        posts: posts
    })
}

module.exports.destroy = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            post.deleteOne();
            await Comment.deleteMany({ post: req.params.id });
            return res.status(200).json({
                message: "Post and associated comment deleted Successfully!!"
            });
        }
        else {
            return res.status(401).json({
                message: 'You can not delete this post!'
            });
        }
    } catch (err) {
        console.log("Error", err);
        return res.status(500).json({
            message: "Internal Server error"
        });
    }
}