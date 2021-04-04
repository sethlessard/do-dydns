import { Router } from "express";

/**
 * Represents a class that contains definitions for api routes.
 */
export default abstract class Routes {
  protected readonly _router: Router;

  /**
   * Routes constructor.
   */
  protected constructor() {
    this._router = Router();
  }

  /**
   * Get the router.
   */
  getRouter(): Router {
    return this._router;
  }
}
