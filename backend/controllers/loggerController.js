// controllers/auditTrailController.js
const AuditTrail = require('../model/loggerModel');

// Get all audit trails
exports.getAuditTrails = async (req, res) => {
    try {
        const auditTrails = await AuditTrail.find().sort({ timestamp: -1 }); // Sort by most recent
        res.status(200).json({ success: true, data: auditTrails });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Get audit trails by user ID
exports.getAuditTrailsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const auditTrails = await AuditTrail.find({ userId }).sort({ timestamp: -1 });
        if (!auditTrails || auditTrails.length === 0) {
            return res.status(404).json({ success: false, message: 'No audit trails found for this user.' });
        }
        res.status(200).json({ success: true, data: auditTrails });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};