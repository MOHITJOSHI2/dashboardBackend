const nodemailer = require('nodemailer');
const path = require('path')
require('dotenv').config({ quiet: true, path: path.resolve('../../', '.env') })

// Configure the transporter 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NWASH_EMAIL, // sending email address
        pass: process.env.NWASH_APP_PASSWORD  // email password or app password
    }
});


async function sendMessageToUser(userEmail, message) {
    try {
        const info = await transporter.sendMail({
            from: process.env.NWASH_EMAIL,
            to: userEmail,
            subject: 'New Message',
            text: message,
        });

        console.log('Email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = { sendMessageToUser }