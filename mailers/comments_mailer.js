const nodeMailer = require('../config/nodemailer');


// This is another way of exporting a method
exports.newComment = (commented) => {

    let htmlString = nodeMailer.renderTemplate({ comment: commented }, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'pransharma011@gmail.com',
        to: commented.user.email,
        subject: 'New Comment Published!!',
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log('Error in sending mail', err);
            return;
        }

        // console.log('Message Sent', info);
        return;
    });
}