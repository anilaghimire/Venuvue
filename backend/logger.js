// logger.js
const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const mongoose = require('mongoose');
const AuditTrail = require('./model/audittrail'); // Import the AuditTrail model

const { combine, timestamp, printf } = format;

// Define the custom format for logs
const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Define the Winston logger
const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/audit-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m', 
            maxFiles: '14d'
        }),
        new transports.Console()
    ]
});

// Middleware to log audit trails into MongoDB
// const auditTrailMiddleware = async (req, res, next) => {
//     const userId = req.user ? req.user._id : null; // Assuming user data is available on req.user

//     res.on('finish', async () => {
//         try {
//             const auditLog = new AuditTrail({
//                 userId: userId,
//                 action: req.method,
//                 endpoint: req.originalUrl,
//                 method: req.method,
//                 status: res.statusCode,
//                 description: Performed ${req.method} on ${req.originalUrl},
//                 additionalData: req.body, // Capture any additional data (e.g., req.body or req.params)
//             });

//             await auditLog.save(); // Save the log to MongoDB

//             logger.info(Audit trail logged for user: ${userId || 'System'}, action: ${req.method} on ${req.originalUrl});
//         } catch (error) {
//             logger.error(Failed to log audit trail: ${error.message});
//         }
//     });

//     next(); // Continue with the next middleware or route handler
// };

module.exports = { logger };