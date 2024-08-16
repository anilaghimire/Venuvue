const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;
 
const myFormat = printf(({ level, message, timestamp }) => {
    return $`{timestamp} ${level}: ${message}`;
});
 
const logger = createLogger({
    format: combine(
        colorize(),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'api-requests.log' })
    ],
    exitOnError: false,
});
 
module.exports = logger;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const logSchema = new Schema({
    userId: { type: String, default: 'Anonymous' },
    method: { type: String, required: true },
    url: { type: String, required: true },
    headers: { type: Object, required: true },
    body: { type: Object, required: true },
    query: { type: Object, required: true },
    params: { type: Object, required: true },
    actionDescription: { type: String, required: true },  // New field for descriptive logs
    timestamp: { type: Date, default: Date.now }
});
 
 
module.exports = mongoose.model('Log', logSchema);