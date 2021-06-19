import { Request, Response } from "express";
import { ExpressController } from "./ExpressController";
import { GetUpdatesFromDigitalOcean } from "../../domain/usecases/digitalocean/GetUpdatesFromDigitalOcean";
import { injectable } from "tsyringe";

@injectable()
export class DigitalOceanController extends ExpressController {
  /**
   * Create a new DigitalOceanController instance.
   * @param getUpdatesFromDigitalOcean
   */
  constructor(
    private readonly getUpdatesFromDigitalOcean: GetUpdatesFromDigitalOcean
  ) {
    super();
  }

  /**
   * Sync with Digital Ocean.
   * @param req the express request.
   * @param res the express response.
   */
  async syncWithDigitalOcean(req: Request, res: Response) {
    try {
      const result = await this.getUpdatesFromDigitalOcean.execute();
      if (result.success === false) {
        this.jsonError(res, result.error);
        return;
      }

      res.status(204).json({ success: true });
    } catch (error) {
      this.jsonError(res, error);
    }
  }
}
