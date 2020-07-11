const { Router } = require("express");
const getSubdomainDbInstance = require("../db/SubdomainDb");
const router = Router();

const db = getSubdomainDbInstance();

/**
 * Handle GET /subdomain
 * 
 * Returns all of the registered subdomains.
 */
router.get("/", (req, res) => {
    db.getAll()
        .then(subdomains => res.json(subdomains))
        .catch(err => res.status(500).json({ error: err }));
});

/**
 * Handle POST /subdomain
 * 
 * Create a new subdomain record.
 */
router.post("/", (req, res) => {
    const { hostname, domain } = req.body;
    // TODO: validate hostname, domain
    
    db.find({ hostname, domain, active: true })
        .then(subdomain => {
            if (!subdomain)
                Promise.reject("The subdomain has already been created.")
        })
        .then(() => db.insert({ hostname, domain }))
        .then(subdomain => res.json(subdomain))
        .catch(err => res.status(500).json({ error: err }));
});

/**
 * Handle PUT /subdomain/:id
 * 
 * Update a subdomain record.
 */
router.put("/:id", (req, res) => {
    const { _id, hostname, domain, active, recordUpdated, recordCreated } = req.body;
    // TODO: validate _id, hostname, domain, active, recordUpdated, recordCreated, req.param.id
    db.exists(req.param.id)
        .then(exists => {
            if (exists)
                return Promise.reject(`The subdomain with id ${id} cannot be found in the database.`);
        })
        .then(() => db.update({ _id, hostname, domain, active, recordUpdated, recordCreated }))
        .then(subdomain => res.json(subdomain))
        .catch(err => res.status(500).json({ error: err }));
});

/**
 * Handle DELETE /subdomain/:id
 * 
 * Delete a subdomain record.
 */
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    // TODO: id
    db.delete(id)
        .then(subdomain => res.json(subdomain))
        .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
