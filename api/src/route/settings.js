const { Router } = require("express");
const getSettingsDbInstance = require("../db/SettingsDb");
const getLogManagerInstance = require("../manager/LogManager");
const router = Router();

const db = getSettingsDbInstance();
const logManager = getLogManagerInstance();

/**
 * Handle GET /settings
 * 
 * Get the settings.
 */
router.get('/', (req, res) => {
  db.get("0")
    .then(settings => res.json(settings))
    .catch(err => res.status(500).json({ error: err }));
});

/**
 * Handle PUT /settings
 */
router.put('/', (req, res) => {
  const { apiKey, networkUpdateInterval } = req.body;
  // TODO: validate apiKey and networkUpdateInterval

  db.update({ _id: "0", apiKey, networkUpdateInterval })
    .then(settings => {
      res.json(settings);
      logManager.addLog("Updated settings")
    })
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
