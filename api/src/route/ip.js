const { Router } = require("express");
const getIPManagerInstance = require("../IPManager");
const router = Router();

const ipManager = getIPManagerInstance();

/**
 * Handle GET '/'
 * 
 * Returns the current IP Address.
 */
router.get("/", (req, res) => {
    // TODO: return the current ip address
    ipManager.getCurrentIP()
    .then(ip => res.json({ ip }))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;