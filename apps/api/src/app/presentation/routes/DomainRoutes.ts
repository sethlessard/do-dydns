import { injectable } from "tsyringe";
import { DomainController } from "../controllers/DomainController";
import Routes from "./Routes";
import { SubdomainRoutes } from "./SubdomainRoutes";

@injectable()
export class DomainRoutes extends Routes {
  /**
   * Create a new DomainRoutes instance.
   * @param domainController the domain controller.
   * @param subdomainRoutes the subdomain routes.
   */
  constructor(
    domainController: DomainController,
    subdomainRoutes: SubdomainRoutes
  ) {
    super();
    this._router.use("/:domainID/subdomain", subdomainRoutes.getRouter());

    this._router.get("/", (req, res) => domainController.getDomains(req, res));
    this._router.put("/:domain", (req, res) =>
      domainController.updateDomain(req, res)
    );
    this._router.delete("/:domain", (req, res) =>
      domainController.deleteDomain(req, res)
    );
  }
}
