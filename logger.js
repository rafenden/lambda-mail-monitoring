const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const packageJson = require('./package');

const logFormat = printf(info => {
    return `[${info.timestamp}] [${info.level.toUpperCase()}]: ${info.message}`;
});

const logger = createLogger({
    format: combine(
        label({label: packageJson.name}),
        timestamp(),
        logFormat
    ),
    transports: [new transports.Console()]
});

module.exports = logger;
