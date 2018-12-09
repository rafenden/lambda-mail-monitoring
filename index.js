const nodemailer = require('nodemailer');
const logger = require('./logger');
const axios = require('axios');
const config = require('./config');

exports.handler = async (event, context) => {
    try {
        const time = new Date().toISOString();
        const id = `lambda-mail-monitoring-${time}`;
        await sendEmail(id);
        await new Promise(resolve => setTimeout(resolve, parseInt(config.WAIT_FOR_MAIL, 10)));
        await validateEmail(id);
    }
    catch (e) {
        logger.error(e);
    }
};

async function sendEmail(id) {
    const transporter = nodemailer.createTransport(config.SMTP_CONNECTION);

    // Verify connection.
    await transporter.verify();
    logger.info('Server is ready to take our messages');

    // Send the email.
    const mailOptions = {
        from: config.MAIL_FROM,
        to: config.MAIL_TO,
        subject: `Ping sent on ${id}`,
        text: 'This email is sent to verify if your MX severs works as expected.',
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Message sent: ${id}`);
}

async function validateEmail(id) {
    const response = await axios.get(config.INBOX_URL, {timeout: config.HTTP_TIMEOUT});
    if (response.data.includes(id)) {
        logger.info(`Email with ID ${id} found!`);
    }
    else {
        throw new Error(`Email with ID ${id} not found!`);
    }
}