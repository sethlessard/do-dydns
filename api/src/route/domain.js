const { Router } = require("express");
const getDomainDbInstance = require("../db/DomainDb");
const getSubdomainDbInstance = require("../db/SubdomainDb");
const getLogManagerInstance = require("../manager/LogManager");
const router = Router();

const db = getDomainDbInstance();
const subdomainDb = getSubdomainDbInstance();
const logManager = getLogManagerInstance();

/**
 * Handle GET /domain
 * 
 * Returns all of the registered domains.
 */
router.get("/", (req, res) => {
  db.getAll()
    .then(domains => res.json(domains))
    .catch(err => res.status(500).json({ error: err }));
});

/**
 * Handle POST /domain
 * 
 * Create a new domain record.
 */
router.post("/", (req, res) => {
  const { domain } = req.body;
  // TODO: validate domain

  db.find({ domain })
    .then(d => {
      if (d)
        Promise.reject("The domain has already been created.")
    })
    .then(() => db.insert({ hostname, domain, active: true }))
    .then(domain => {
      res.json(domain);
      logManager.addLog(`Registered new domain "${domain.domain}"`);
    })
    .catch(err => res.status(500).json({ error: err }));
});

/**
 * Handle PUT /domain/:id
 * 
 * Update a domain record.
 */
router.put("/:id", (req, res) => {
  const domain = req.body;
  // TODO: validate domain
  db.exists(req.param.id)
    .then(exists => {
      if (exists)
        return Promise.reject(`The domain with id ${req.param.id} cannot be found in the database.`);
    })
    .then(() => db.update(domain))
    .then(domain => {
      if (!domain.active) {
        return subdomainDb.updateBy({ active: false }, { domain: domain.name })
          .then(() => domain);
      }
      return domain;
    })
    .then(domain => res.json(domain))
    .catch(err => res.status(500).json({ error: err }));
});

/**
 * Handle DELETE /domain/:id
 * 
 * Delete a domain record.
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  // TODO: id
  db.delete(id)
    .then(domain => res.json(domain))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
