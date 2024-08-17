const AuditTrail = require('../model/loggerModel');
const { logger } = require('../logger');

const auditTrailMiddleware = async (req, res, next) => {
    try {
        const userId = req.user ? req.user.userId : null;
        const auditTrail = new AuditTrail({
            userId, // Assuming userId comes from req.user
            action: req.method, // Assuming you want to track the HTTP method
            method: req.method,
            ipAddress: req.ip,
            statusCode: res.statusCode
        });

        await auditTrail.save();
        logger.info(`Audit trail logged: ${req.method} ${req.originalUrl}`);
    } catch (error) {
        logger.error(`Failed to log audit trail: ${error.message}`);
    }

    next();
};

module.exports = { auditTrailMiddleware };c