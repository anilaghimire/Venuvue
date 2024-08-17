const mongoose = require('mongoose');

// Update the schema with a valid enum for HTTP methods
const auditTrailSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default : 'Anonymous',
        ref: 'User',
        required: false,
    },
    action: {
        type: String,
        enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'LOGIN', 'LOGOUT', 'UPDATE_PROFILE', 'CREATE_ORDER', 'DELETE_ORDER', 'REGISTER', 'FORGOT_PASSWORD'],
        required: true
    },
    method: {
        type: String,
        required: false
    },
    ipAddress: {
        type: String,
        required: false
    },
    statusCode: {
        type: Number,
        required: false
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const AuditTrail = mongoose.model('AuditTrail', auditTrailSchema);

module.exports = AuditTrail;