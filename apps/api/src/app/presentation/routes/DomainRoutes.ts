import { injectable } from "tsyringe";
import { DomainController } from "../controllers/DomainController";
import { Routes } from "./Routes";
import { SubdomainController } from "../controllers/SubdomainController";

@injectable()
export class DomainRoutes extends Routes {
  /**
   * Create a new DomainRoutes instance.
   * @param domainController the domain controller.
   * @param subdomainController the subdomain controller.
   */
  constructor(
    domainController: DomainController,
    subdomainController: SubdomainController
  ) {
    super();
    this._router.get("/:domain/subdomains", (req, res) =>
      subdomainController.getSubdomainsForDomain(req, res)
    );
    this._router.post("/:domain/subdomains", (req, res) =>
      subdomainController.createNewSubdomain(req, res)
    );
    this._router.put("/:domain/subdomains/:subdomain", (req, res) =>
      subdomainController.updateSubdomain(req, res)
    );
    this._router.delete("/:domain/subdomains/:subdomain", (req, res) =>
      subdomainController.deleteSubdomain(req, res)
    );
    this._router.get("/", (req, res) => domainController.getDomains(req, res));
    this._router.put("/:domain", (req, res) =>
      domainController.updateDomain(req, res)
    );
    this._router.delete("/:domain", (req, res) =>
      domainController.deleteDomain(req, res)
    );
  }
}
