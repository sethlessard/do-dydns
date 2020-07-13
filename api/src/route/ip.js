const { Router } = require("express");
const getIPManagerInstance = require("../manager/IPManager");
const router = Router();

const ipManager = getIPManagerInstance();

/**
 * Handle GET '/'
 * 
 * Returns the current IP Address.
 */
router.get("/", (req, res) => {
    ipManager.getLastKnownIP()
        .then(ip => res.json({ ip }))
        .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;