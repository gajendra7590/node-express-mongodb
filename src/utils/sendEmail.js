const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'gajendra.pawar.mailer@gmail.com',
        pass: 'phwodpvmxqkouphv',
    },
    secure: true,
});


const sendEmail = async () => {
    const mailData = {
        from: 'gajendra.pawar.mailer@gmail.com',
        to: 'er.gajendrapawar@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: '<b>Hey there! </b> <br> This is our first message sent with Nodemailer <br />',
    };

    try {
        const info = await transporter.sendMail(mailData);
        console.log("Email sent successfully:", info.messageId);
        return info;
    } catch (error) {
        console.error("Failed to send email:", error);
        throw error;
    }
}

module.exports = { sendEmail };