import { Router } from "express";
import DomainDb, { DomainEntry } from "../db/DomainDb";
import SubdomainDb, { SubdomainEntry } from "../db/SubdomainDb";
import LogManager from "../manager/LogManager";
const router = Router();

const db = DomainDb.getInstance();
const subdomainDb = SubdomainDb.getInstance();
const logManager = LogManager.getInstance();

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
  const domain = req.body;
  if (!validateDomain(domain)) {
    res.status(500).json({ error: "malformed data" });
    return;
  }

  db.find({ name: domain.name })
    .then(d => {
      if (d)
        Promise.reject("The domain has already been created.")
    })
    .then(() => db.insert(domain))
    .then(domain => {
      res.json(domain);
      logManager.addLog(`Registered new domain "${domain.name}"`);
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
  if (!validateDomain(domain)) {
    res.status(500).json({ error: "no 'id' supplied in url" });
    return;
  }
  db.exists(req.params.id)
    .then(exists => {
      if (!exists)
        return Promise.reject(`The domain with id ${req.params.id} cannot be found in the database.`);
    })
    .then(() => db.update(domain))
    .then(domain => {
      if (!domain.active) {
        return subdomainDb.updateBy({ active: false } as SubdomainEntry, { domain: domain.name })
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
  if (!id) {
    res.status(500).json({ error: "no 'id' supplied in url" });
    return;
  }
  db.delete(id)
    .then(domain => res.json(domain))
    .catch(err => res.status(500).json({ error: err }));
});

/**
 * Validate a domain.
 * @param domain the domain.
 */
const validateDomain = (domain: DomainEntry) => {
  if (!domain._id || !domain.ttl || !domain.name || !domain.zone_file) {
    return false;
  }
  return true
};

export default router;
