import { injectable } from "tsyringe";
import { LogController } from "../controllers/LogController";
import { Routes } from "./Routes";

@injectable()
export class LogRoutes extends Routes {
  /**
   * Create the LogRoutes.
   * @param logController the log controller.
   */
  constructor(logController: LogController) {
    super();

    // configure the routes
    this._router.get("/", (req, res) => logController.getLogs(req, res));
    this._router.delete("/", (req, res) => logController.deleteLogs(req, res));
  }
}
