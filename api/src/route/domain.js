const { Router } = require("express");
const getDomainDbInstance = require("../db/DomainDb");
const router = Router();

const db = getDomainDbInstance();

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
    .then(domain => res.json(domain))
    .catch(err => res.status(500).json({ error: err }));
});

/**
 * Handle PUT /domain/:id
 * 
 * Update a domain record.
 */
router.put("/:id", (req, res) => {
  const { _id, domain, active, recordUpdated, recordCreated } = req.body;
  // TODO: validate _id, domain, active, recordUpdated, recordCreated, req.param.id
  db.exists(req.param.id)
    .then(exists => {
      if (exists)
        return Promise.reject(`The domain with id ${id} cannot be found in the database.`);
    })
    .then(() => db.update({ _id, domain, active, recordUpdated, recordCreated }))
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
