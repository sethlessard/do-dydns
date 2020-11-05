import { Router } from "express";
import IPManager from "../manager/IPManager";
const router = Router();

const ipManager = IPManager.getInstance();

/**
 * Handle GET '/'
 * 
 * Returns the current IP Address.
 */
router.get("/", (req, res) => {
    ipManager.getLastKnownIP()
        .then((ip: string) => res.json({ ip }))
        .catch((err: Error) => res.status(500).json({ error: err }));
});

export default router;
