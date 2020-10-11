const { Router } = require("express");
const getSettingsDbInstance = require("../db/SettingsDb");
const getDOManagerInstance = require("../manager/DOManager");
const getLogManagerInstance = require("../manager/LogManager");
const router = Router();

const db = getSettingsDbInstance();
const logManager = getLogManagerInstance();
const doManager = getDOManagerInstance();

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
  const settings = req.body;
  if (!validateSettings(settings)) {
    res.status(500).json({ error: "malformed data" });
    return;
  }

  settings._id = "0";
  db.update(settings)
    .then(settings => {
      res.json(settings);
      logManager.addLog("Updated settings");
      // if DigitalOcean isn't initialized with the user's API key, do that now.
      if (!doManager.isInitialized()) {
        doManager.initialize(settings.apiKey);
      }
      return doManager.getAllDomains();
    })
    .catch(err => res.status(500).json({ error: err }));
});

/**
 * Validate a settings object
 * @param {{ _id: string, apiKey: string, networkUpdateIntervalMinutes: number, recordCreated: number, recordUpdated: number }} settings 
 */
const validateSettings = (settings) => {
  const keys = Object.keys(settings);
  if ((keys.indexOf("apiKey") === -1) || (keys.indexOf("networkUpdateIntervalMinutes") === -1)) {
    return false;
  }
  return true;
};

module.exports = router;
