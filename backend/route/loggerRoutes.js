// routes/auditTrailRoutes.js
const express = require('express');
const { getAuditTrails, getAuditTrailsByUser } = require('../controllers/loggerController');
const { authGuard } = require('../middleware/authGuard'); // Ensure you have authentication middleware

const router = express.Router();

// Route for getting all audit trails (admin or authorized personnel might use this)
router.get('/', authGuard, getAuditTrails);

// Route for getting audit trails by a specific user
router.get('/user/:userId', authGuard, getAuditTrailsByUser);

module.exports = router;