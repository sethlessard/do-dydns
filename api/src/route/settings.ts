import { Router } from "express";
import SettingsDb, { SettingsEntry } from "../db/SettingsDb";
import DOManager from "../manager/DOManager";
import LogManager from "../manager/LogManager";
const router = Router();

const db = SettingsDb.getInstance();
const logManager = LogManager.getInstance();
const doManager = DOManager.getInstance();

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
 * @param settings 
 */
const validateSettings = (settings: SettingsEntry) => {
  const keys = Object.keys(settings);
  if ((keys.indexOf("apiKey") === -1) || (keys.indexOf("networkUpdateIntervalMinutes") === -1)) {
    return false;
  }
  return true;
};

export default router;
