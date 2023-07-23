module.exports.index = function (req, res) {
    return res.json(200, {
        message: "We finally send v2 api",
        posts: [{}]
    })
}