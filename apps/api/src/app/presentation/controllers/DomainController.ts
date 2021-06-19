import {
  ApiDomainArrayResponse,
  ApiDomainEntity,
  ApiDomainResponse,
} from "@do-dydns/api-definition";
import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { DeleteDomain } from "../../domain/usecases/domain/DeleteDomain";
import { GetAllDomains } from "../../domain/usecases/domain/GetAllDomains";
import { UpdateDomain } from "../../domain/usecases/domain/UpdateDomain";
import { ExpressController } from "./ExpressController";
import { DomainEntity } from "../../domain/entities/DomainEntity";

@injectable()
export class DomainController extends ExpressController {
  /**
   * Get all domains.
   * @param _ the express request.
   * @param res the express response.
   */
  async getDomains(_: Request, res: Response): Promise<void> {
    const getAllDomainsUseCase = container.resolve(GetAllDomains);
    try {
      const result = await getAllDomainsUseCase.execute();
      if (result.success === false) {
        this.jsonError(res, result.error);
        return;
      }

      DomainController.respondWithDomains(res, result.payload);
    } catch (error) {
      this.jsonError(res, error);
    }
  }

  /**
   * Update a domain.
   * @param req the express request.
   * @param res the express response.
   */
  async updateDomain(req: Request, res: Response): Promise<void> {
    const domainName = req.params["domain"];
    const domain = req.body as ApiDomainEntity;
    if (!DomainController.verifyDomain(res, domainName, domain)) {
      return;
    }
    if (!DomainController.validateDomain(res, domain)) {
      return;
    }
    const updateDomainUseCase = container.resolve(UpdateDomain);
    try {
      updateDomainUseCase.setRequestParam({
        domain: Object.assign(domain, { zoneFile: "" }),
      });
      const result = await updateDomainUseCase.execute();
      if (result.success === false) {
        this.jsonError(res, result.error);
        return;
      }

      DomainController.respondWithDomain(res, result.payload);
    } catch (error) {
      this.jsonError(res, error);
    }
  }

  /**
   * Delete a domain.
   * @param req the express request.
   * @param res the express response.
   */
  async deleteDomain(req: Request, res: Response): Promise<void> {
    const domainName = req.params["domain"];
    const domain = req.body as ApiDomainEntity;

    if (!DomainController.verifyDomain(res, domainName, domain)) {
      return;
    }
    if (!DomainController.validateDomain(res, domain)) {
      return;
    }
    const deleteDomainUseCase = container.resolve(DeleteDomain);
    try {
      deleteDomainUseCase.setRequestParam({
        domain: Object.assign(domain, { zoneFile: "" }),
      });
      const response = await deleteDomainUseCase.execute();
      if (response.success === false) {
        this.jsonError(res, response.error);
        return;
      }

      res.status(204).end();
    } catch (error) {
      this.jsonError(res, error);
    }
  }

  /**
   * Respond with a single domain.
   * @param res the express response.
   * @param domain the domain
   * @private
   */
  private static respondWithDomain(res: Response, domain: DomainEntity): void {
    const response: ApiDomainResponse = {
      success: true,
      domain,
    };
    res.status(204).json(response);
  }

  /**
   * Respond with an array of domains.
   * @param res the express request.
   * @param domains the domains.
   * @private
   */
  private static respondWithDomains(
    res: Response,
    domains: DomainEntity[]
  ): void {
    const response: ApiDomainArrayResponse = {
      success: true,
      domains: domains.map((d) => ({
        id: d.id,
        name: d.name,
        ttl: d.ttl,
        created: d.created,
        updated: d.updated,
        active: d.active,
      })),
    };
    res.status(200).json(response);
  }

  // TODO: move this to the domain layer, inside its own validator class
  /**
   * Validate a domain.
   * @param res the express response.
   * @param domain the domain to validate.
   * @private
   */
  private static validateDomain(
    res: Response,
    domain: ApiDomainEntity
  ): boolean {
    // TODO: implement
    return true;
  }

  /**
   * Verify that a domain object is for a requested domain.
   * @param res the express response.
   * @param domainName the name of the requested domain.
   * @param domain the domain object.
   */
  private static verifyDomain(
    res: Response,
    domainName: string,
    domain: ApiDomainEntity
  ): boolean {
    // TODO: implement
    return domainName && domainName.length > 0 && domainName === domain.name;
  }
}
