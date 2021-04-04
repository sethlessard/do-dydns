import {
  ApiDomainArrayResponse,
  ApiDomainResponse,
} from "@do-dydns/api-definition";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { DomainRepository } from "../../domain/datasources/repositories/DomainRepository";
import { IPRepository } from "../../domain/datasources/repositories/IPRepository";
import { SubdomainRepository } from "../../domain/datasources/repositories/SubdomainRepository";
import { DOService } from "../../domain/datasources/services/DOService";
import { DeleteDomainUseCase } from "../../domain/usecases/domain/DeleteDomainUseCase/DeleteDomainUseCase";
import { GetAllDomainsUseCase } from "../../domain/usecases/domain/GetAllDomainsUseCase/GetAllDomainsUseCase";
import { UpdateDomainUseCase } from "../../domain/usecases/domain/UpdateDomainUseCase/UpdateDomainUseCase";
import { ExpressController } from "./ExpressController";
import { DomainModel } from "../../data/models/DomainModel";

@injectable()
export class DomainController extends ExpressController {
  /**
   * Create a new DomainController instance.
   * @param domainRepository the domain repository.
   * @param subdomainRepository the subdomain repository.
   * @param ipRepository the ip repository.
   * @param doService the digital ocean service.
   */
  constructor(
    @inject("DomainRepository")
    private readonly domainRepository: DomainRepository,
    @inject("SubdomainRepository")
    private readonly subdomainRepository: SubdomainRepository,
    @inject("IPRepository") private readonly ipRepository: IPRepository,
    @inject("DOService") private readonly doService: DOService
  ) {
    super();
  }

  /**
   * Get all domains.
   * @param _ the express request.
   * @param res the express response.
   */
  async getDomains(_: Request, res: Response): Promise<void> {
    const getDomainUseCase = new GetAllDomainsUseCase(this.domainRepository);
    try {
      const result = await getDomainUseCase.execute();
      if (result.success === false) {
        this.jsonError(res, result.error);
        return;
      }

      const response: ApiDomainArrayResponse = {
        success: true,
        domains: result.payload.map((d) => ({
          id: d.id,
          name: d.name,
          ttl: d.ttl,
          created: d.created,
          updated: d.updated,
          active: d.active,
        })),
      };
      res.status(200).json(response);
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
    const { domain } = req.body;
    if (!DomainController.verifyDomain(res, domainName, domain)) {
      return;
    }
    if (!DomainController.validateDomain(res, domain)) {
      return;
    }
    const updateDomainUseCase = new UpdateDomainUseCase(
      this.domainRepository,
      this.subdomainRepository,
      this.ipRepository,
      this.doService
    );
    try {
      updateDomainUseCase.setRequestParam({ domain });
      const result = await updateDomainUseCase.execute();
      if (result.success === false) {
        this.jsonError(res, result.error);
        return;
      }

      const response: ApiDomainResponse = {
        success: true,
        domain: result.payload,
      };
      res.status(204).json(response);
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
    const { domain } = req.body;

    if (!DomainController.verifyDomain(res, domainName, domain)) {
      return;
    }
    if (!DomainController.validateDomain(res, domain)) {
      return;
    }
    const deleteDomainUseCase = new DeleteDomainUseCase(
      this.domainRepository,
      this.subdomainRepository,
      this.doService
    );
    try {
      deleteDomainUseCase.setRequestParam({ domain });
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

  // TODO: move this to the domain layer, inside its own validator class
  /**
   * Validate a domain.
   * @param res the express response.
   * @param domain the domain to validate.
   * @private
   */
  private static validateDomain(res: Response, domain: DomainModel) {
    // TODO: implement
    return true;
  }

  /**
   * Verify that a domain object is for a requested domain.
   * @param res the express response.
   * @param domainName the name of the requuested domain.
   * @param domain the domain object.
   */
  private static verifyDomain(
    res: Response,
    domainName: string,
    domain: DomainModel
  ): boolean {
    // TODO: implement
    return domainName && domainName.length > 0 && domainName === domain.name;
  }
}
