import { Router } from "express";
import LogManager from "../manager/LogManager";
const router = Router();

const logManager = LogManager.getInstance();

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

export default router;
