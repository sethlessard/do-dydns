const { Router } = require("express");
const router = Router();

/**
 * Handle GET /subdomain
 * 
 * Returns all of the registered subdomains
 */
router.get("/", (req, res) => {
    // TODO: implement
    res.send("not implemented");
})

module.exports = router;
