import Routes from "./Routes";
import { injectable } from "tsyringe";
import { DigitalOceanController } from "../controllers/DigitalOceanController";

@injectable()
export class DigitalOceanRoutes extends Routes {
  constructor(digitalOceanController: DigitalOceanController) {
    super();

    this._router.post("/sync", (req, res) =>
      digitalOceanController.syncWithDigitalOcean(req, res)
    );
  }
}
