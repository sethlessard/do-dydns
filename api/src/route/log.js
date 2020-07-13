const { Router } = require("express");
const getLogManagerInstance = require("../manager/LogManager");
const router = Router();

const logManager = getLogManagerInstance();

/**
 * Handle GET /log
 * 
 * Get the log.
 */
router.get('/', (req, res) => {
  logManager.getLog()
    .then(log => res.json(log))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
