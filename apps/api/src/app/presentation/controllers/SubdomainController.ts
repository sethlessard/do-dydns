import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { DOService } from "../../domain/datasources/services/DOService";
import { DomainRepository } from "../../domain/datasources/repositories/DomainRepository";
import { IPRepository } from "../../domain/datasources/repositories/IPRepository";
import { SubdomainRepository } from "../../domain/datasources/repositories/SubdomainRepository";
import { CreateNewSubdomainUseCase } from "../../domain/usecases/subdomain/CreateNewSubdomainUseCase/CreateNewSubdomainUseCase";
import { DeleteSubdomainUseCase } from "../../domain/usecases/subdomain/DeleteSubdomainUseCase/DeleteSubdomainUseCase";
import { GetAllSubdomainsForDomainUseCase } from "../../domain/usecases/subdomain/GetAllSubdomainsForDomainUseCase/GetAllSubdomainsForDomainUseCase";
import { UpdateSubdomainUseCase } from "../../domain/usecases/subdomain/UpdateSubdomainUseCase/UpdateSubdomainUseCase";
import { ExpressController } from "./ExpressController";
import {
  ApiSubdomainArrayResponse,
  ApiSubdomainResponse,
} from "@do-dydns/api-definition";

@injectable()
export class SubdomainController extends ExpressController {
  /**
   * Create a new SubdomainController instance.
   * @param subdomainRepository the Subdomain repository.
   * @param domainRepository the domain repository.
   * @param ipRepository the IP repository.
   * @param doService the DigitalOcean service.
   */
  constructor(
    @inject("SubdomainRepository")
    private readonly subdomainRepository: SubdomainRepository,
    @inject("DomainRepository")
    private readonly domainRepository: DomainRepository,
    @inject("IPRepository") private readonly ipRepository: IPRepository,
    @inject("DOService") private readonly doService: DOService
  ) {
    super();
  }

  /**
   * Create a new subdomain.
   * @param req the express request.
   * @param res the express response.
   */
  async createNewSubdomain(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    const { domainID } = req.params;
    // TODO: verify subdomain body and subdomain url param match
    // TODO: validate subdomain

    // TODO: dependency injection?
    const createNewSubdomainUseCase = new CreateNewSubdomainUseCase(
      this.subdomainRepository,
      this.domainRepository,
      this.ipRepository,
      this.doService
    );
    try {
      createNewSubdomainUseCase.setRequestParam({ domainID, name });
      const result = await createNewSubdomainUseCase.execute();
      if (result.success === false) {
        this.jsonError(res, result.error);
        return;
      }

      const response: ApiSubdomainResponse = {
        success: true,
        subdomain: result.payload,
      };
      res.status(201).json(response);
    } catch (error) {
      this.jsonError(res, error);
    }
  }

  /**
   * Get the subdomains for a specified domain.
   * @param req the express request.
   * @param res the express response.
   */
  async getSubdomainsForDomain(req: Request, res: Response): Promise<void> {
    const { domainID } = req.params;
    // TODO: verify subdomain body and subdomain url param match
    // TODO: validate subdomain

    const getSubdomainsForDomainUseCase = new GetAllSubdomainsForDomainUseCase(
      this.domainRepository,
      this.subdomainRepository
    );
    try {
      getSubdomainsForDomainUseCase.setRequestParam({ domainID });
      const result = await getSubdomainsForDomainUseCase.execute();
      if (result.success === false) {
        this.jsonError(res, result.error);
        return;
      }

      const response: ApiSubdomainArrayResponse = {
        success: true,
        subdomains: result.payload,
      };
      res.status(200).json(response);
    } catch (error) {
      this.jsonError(res, error);
    }
  }

  /**
   * Update a subdomain.
   * @param req the express request.
   * @param res the express response.
   */
  async updateSubdomain(req: Request, res: Response): Promise<void> {
    const { subdomain } = req.body;
    // TODO: verify subdomain body and subdomain url param match
    // TODO: validate subdomain

    const updateSubdomainUseCase = new UpdateSubdomainUseCase(
      this.subdomainRepository,
      this.ipRepository,
      this.doService
    );
    try {
      updateSubdomainUseCase.setRequestParam({ subdomain });
      const result = await updateSubdomainUseCase.execute();
      if (result.success === false) {
        this.jsonError(res, result.error);
        return;
      }
      const response: ApiSubdomainResponse = {
        success: true,
        subdomain: result.payload,
      };
      res.status(201).json(response);
    } catch (error) {
      this.jsonError(res, error);
    }
  }

  /**
   * Delete a subdomain object.
   * @param req the express request.
   * @param res the express response.S
   */
  async deleteSubdomain(req: Request, res: Response): Promise<void> {
    const { subdomain } = req.body;
    // TODO: verify subdomain body and subdomain url param match
    // TODO: validate subdomain

    const deleteSubdomainUseCase = new DeleteSubdomainUseCase(
      this.subdomainRepository,
      this.doService
    );
    try {
      deleteSubdomainUseCase.setRequestParam({ subdomain });
      const result = await deleteSubdomainUseCase.execute();
      if (result.success === false) {
        this.jsonError(res, result.error);
        return;
      }
      res.status(204).end();
    } catch (error) {
      this.jsonError(res, error);
    }
  }
}
