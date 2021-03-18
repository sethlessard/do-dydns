import { injectable } from "tsyringe";
import { SettingsController } from "../controllers/SettingsController";
import Routes from "./Routes";

@injectable()
export class SettingsRoutes extends Routes {

  constructor(settingsController: SettingsController) {
    super();

    this._router.get("/", (req, res) => settingsController.getSettings(req, res));
    this._router.put("/", (req, res) => settingsController.updateSettings(req, res));
  }
}
