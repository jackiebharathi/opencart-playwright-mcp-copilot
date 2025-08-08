const winston = require('winston');
const path = require('path');

// Define log format
const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
);

// Create logger instance
const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        // Write to console
        new winston.transports.Console(),
        // Write to log file
        new winston.transports.File({ 
            filename: path.join(__dirname, '../logs/test-execution.log')
        }),
        // Write errors to separate file
        new winston.transports.File({ 
            filename: path.join(__dirname, '../logs/error.log'), 
            level: 'error' 
        })
    ]
});

module.exports = logger;
