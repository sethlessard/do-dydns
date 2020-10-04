const { Router } = require("express");
const zone = require("zone-file");

const getSubdomainDbInstance = require("../db/SubdomainDb");

const router = Router();

const subdomainDb = getSubdomainDbInstance();

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
    const { hostname, domain } = req.body;
    // TODO: validate hostname, domain
    
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
    // TODO: validate subdomain
    subdomainDb.exists(req.param.id)
      .then(exists => {
        if (exists)
          return Promise.reject(`The Subdomain with id ${req.param.id} cannot be found in the database.`);
      })
      .then(() => subdomainDb.update(subdomain))
      .then(subdomain => res.json(subdomain))
      .catch(err => res.status(500).json({ error: err }));
});

/**
 * Handle DELETE /subdomain/:id
 * 
 * Delete a subdomain record.
 */
router.delete("/:id", (req, res) => {
    // const { id } = req.params;
    // // TODO: id
    // subdomainDb.delete(id)
    //     .then(subdomain => res.json(subdomain))
    //     .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
