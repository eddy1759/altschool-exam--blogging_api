const winston = require('winston')
const options = {
    file: {
        level: 'info',
        filename: './log/app.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: true
},
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    }
}

const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exiyOnError: false
})

module.exports = logger