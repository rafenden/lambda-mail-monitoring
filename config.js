const dotEnv = require('dotenv');

dotEnv.config();

const config = {
    SMTP_CONNECTION: process.env.SMTP_CONNECTION,
    MAIL_FROM: process.env.MAIL_FROM,
    MAIL_TO: process.env.MAIL_TO,
    INBOX_URL: process.env.INBOX_URL,
    WAIT_FOR_MAIL: process.env.WAIT_FOR_MAIL || 15000,
    HTTP_TIMEOUT: process.env.HTTP_TIMEOUT || 15000,
};

module.exports = config;
