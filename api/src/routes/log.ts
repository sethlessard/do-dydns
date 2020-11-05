import { Router } from "express";
import LogDb from "../db/LogDb";
import LogManager from "../manager/LogManager";
const router = Router();

const logManager = LogManager.getInstance();
const logDB = LogDb.getInstance();

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

/**
 * Handle DELETE /
 * 
 * Delete all logs.
 */
router.delete('/', (req, res) => {
  logDB.deleteAll()
    .then(() => res.json({ status: "ok" }))
    .catch(err => res.status(500).json({ error: err }));
});


export default router;
