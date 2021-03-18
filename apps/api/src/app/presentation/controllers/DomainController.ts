import { ApiGetAllDomainsResponse } from "@do-dydns/api-definition";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { DomainRepository } from "../../domain/datasources/repositories/DomainRepository";
import { IPRepository } from "../../domain/datasources/repositories/IPRepository";
import { SubdomainRepository } from "../../domain/datasources/repositories/SubdomainRepository";
import { DOService } from "../../domain/datasources/services/DOService";
import { CreateNewDomainUseCase } from "../../domain/usecases/domain/CreateNewDomainUseCase/CreateNewDomainUseCase";
import { DeleteDomainUseCase } from "../../domain/usecases/domain/DeleteDomainUseCase/DeleteDomainUseCase";
import { GetAllDomainsUseCase } from "../../domain/usecases/domain/GetAllDomainsUseCase/GetAllDomainsUseCase";
import { UpdateDomainUseCase } from "../../domain/usecases/domain/UpdateDomainUseCase/UpdateDomainUseCase";
import { ExpressController } from "./ExpressController";

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
    @inject("DomainRepository") private readonly domainRepository: DomainRepository,
    @inject("SubdomainRepository") private readonly subdomainRepository: SubdomainRepository,
    @inject("IPRepository") private readonly ipRepository: IPRepository,
    @inject("DOService") private readonly doService: DOService
  ) {
    super();
  }

  /**
   * Create a new domain.
   * @param req the express request.
   * @param res the express response.
   */
  async createNewDomain(req: Request, res: Response): Promise<void> {
    const { name } = req.body;

    const createNewDomainUseCase = new CreateNewDomainUseCase(this.domainRepository, this.ipRepository, this.doService);
    try {
      createNewDomainUseCase.setRequestParam({ name });
      const response = await createNewDomainUseCase.execute();
      if (response.success === false) {
        throw response.error;
      }

      res.status(201).json({ domain: response.payload });
    } catch (error) {
      this.jsonError(res, error);
    }
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
        throw result.error;
      }

      const response: ApiGetAllDomainsResponse = {
        success: true,
        domains: result.payload.map(d => ({ id: d.id, name: d.name, ttl: d.ttl, created: d.created, updated: d.updated, active: d.active }))
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
    const { domain } = req.body;

    const updateDomainUseCase = new UpdateDomainUseCase(this.domainRepository, this.subdomainRepository, this.ipRepository, this.doService);
    try {
      updateDomainUseCase.setRequestParam({ domain });
      const response = await updateDomainUseCase.execute();
      if (response.success === false) {
        throw response.error;
      }

      res.status(204).json({ domain: response.payload });
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
    const { domain } = req.body;

    const deleteDomainUseCase = new DeleteDomainUseCase(this.domainRepository, this.subdomainRepository, this.doService);
    try {
      deleteDomainUseCase.setRequestParam({ domain });
      const response = await deleteDomainUseCase.execute();
      if (response.success === false) {
        throw response.error;
      }

      res.status(202).json({ domain: response.payload });
    } catch (error) {
      this.jsonError(res, error);
    }
  }
}
