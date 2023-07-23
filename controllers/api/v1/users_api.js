const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

// Creating session
module.exports.createSession = async function (req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user || user.password != req.body.password) {
            return req.status(422).json({
                message: "Invalid Username and Password"
            });
        }
        return res.status(200).json({
            message: "Sign In successful, here is your token, please keep it safe!",
            data: {
                token: jwt.sign(user.toJSON(), 'Codeial', { expiresIn: '1000000' })
            }
        });
    }
    catch (err) {
        console.log('******', err);
        return res.status(500).json({
            message: "Internal Server Error!!"
        })
    }
};