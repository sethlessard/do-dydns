import { injectable } from "tsyringe";
import { IPController } from "../controllers/IPController";
import { Routes } from "./Routes";

@injectable()
export class IPRoutes extends Routes {
  /**
   * Create a new IPRoutes object.
   * @param ipController the IPController.
   */
  constructor(ipController: IPController) {
    super();

    // configure the routes
    this._router.get("/", (req, res) =>
      ipController.getCurrentIPAddress(req, res)
    );

    this._router.get("/refresh", (req, res) =>
      ipController.refreshIPAddress(req, res)
    );
  }
}
