import { injectable } from "tsyringe";
import { SubdomainController } from "../controllers/SubdomainController";
import Routes from "./Routes";

@injectable()
export class SubdomainRoutes extends Routes {

  /**
   * Create a new SubdomainRoutes instance.
   * @param subdomainController the subdomain controller.
   */
  constructor(subdomainController: SubdomainController) {
    super();

    // configure the routes
    this._router.get("/", (req, res) => subdomainController.getSubdomainsForDomain(req, res));
    this._router.post("/", (req, res) => subdomainController.createNewSubdomain(req, res));
    this._router.put("/", (req, res) => subdomainController.updateSubdomain(req, res));
    this._router.delete("/", (req, res) => subdomainController.deleteSubdomain(req, res));
  }
}
