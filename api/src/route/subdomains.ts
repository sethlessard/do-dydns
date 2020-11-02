import { Router } from "express";
import SubdomainDb, { SubdomainEntry } from "../db/SubdomainDb";

import DOManager from "../manager/DOManager";

const router = Router();

const doManager = DOManager.getInstance();
const subdomainDb = SubdomainDb.getInstance();

/**
 * Handle GET /subdomain
 * 
 * Returns all of the registered subdomains.
 */
router.get("/", (req, res) => {
    subdomainDb.getAll()
        .then(subdomains => res.json(subdomains))
        .catch(err => res.status(500).json({ error: err }));
});

/**
 * Handle POST /subdomain
 * 
 * Create a new subdomain record.
 */
router.post("/", (req, res) => {
    const subdomain = req.body;
    if (!validateSubdomain(subdomain)) {
        res.status(500).json({ error: "malformed data" });
        return;
    }
    // TODO: implement
    // subdomainDb.find({ hostname, domain })
    //     .then(subdomain => {
    //         if (subdomain)
    //             Promise.reject("The subdomain has already been created.")
    //     })
    //     .then(() => subdomainDb.insert({ hostname, domain, active: true }))
    //     .then(subdomain => res.json(subdomain))
    //     .catch(err => res.status(500).json({ error: err }));
});

/**
 * Handle PUT /subdomain/:id
 * 
 * Update a subdomain record.
 */
router.put("/:id", (req, res) => {
    const subdomain = req.body;
    if (!validateSubdomain(subdomain)) {
        res.status(500).json({ error: "malformed data" });
        return;
    }
    
    subdomainDb.exists(req.params.id)
      .then(exists => {
        if (!exists)
          return Promise.reject(`The Subdomain with id ${req.params.id} cannot be found in the database.`);
      })
      .then(() => subdomainDb.update(subdomain))
        .then(subdomain => res.json(subdomain))
        .then(() => doManager.checkIPUpdates())
      .catch(err => res.status(500).json({ error: err }));
});

/**
 * Handle DELETE /subdomain/:id
 * 
 * Delete a subdomain record.
 */
router.delete("/:id", (req, res) => {
    // const { id } = req.params;
    // // TODO: implement
    // subdomainDb.delete(id)
    //     .then(subdomain => res.json(subdomain))
    //     .catch(err => res.status(500).json({ error: err }));
});

/**
 * Validate a subdomain.
 * @param subdomain the subdomain.
 */
const validateSubdomain = (subdomain: SubdomainEntry) => {
    if (!subdomain._id || !subdomain.name || !subdomain.ttl || !subdomain.ip || !subdomain.domain) {
        return false; 
    }
    return true;
};

export default router;
