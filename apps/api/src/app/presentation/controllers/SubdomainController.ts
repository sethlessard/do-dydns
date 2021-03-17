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
    @inject("SubdomainRepository") private readonly subdomainRepository: SubdomainRepository,
    @inject("DomainRepository") private readonly domainRepository: DomainRepository,
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

    const createNewSubdomainUseCase = new CreateNewSubdomainUseCase(this.subdomainRepository, this.domainRepository, this.ipRepository, this.doService);
    try {
      createNewSubdomainUseCase.setRequestParam({ domainID, name });
      const response = await createNewSubdomainUseCase.execute();
      if (response.success === false) {
        throw response.error;
      }

      res.status(201).json({ subdomain: response.payload });
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

    const getSubdomainsForDomainUseCase = new GetAllSubdomainsForDomainUseCase(this.domainRepository, this.subdomainRepository);
    try {
      getSubdomainsForDomainUseCase.setRequestParam({ domainID });
      const response = await getSubdomainsForDomainUseCase.execute();
      if (response.success === false) {
        throw response.error;
      }

      res.status(200).json({ subdomains: response.payload });
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

    const updateSubdomainUseCase = new UpdateSubdomainUseCase(this.subdomainRepository, this.ipRepository, this.doService);
    try {
      updateSubdomainUseCase.setRequestParam({ subdomain });
      const response = await updateSubdomainUseCase.execute();
      if (response.success === false) {
        throw response.error;
      }

      res.status(204).json({ subdomain: response.payload });
    } catch (error) {
      this.jsonError(res, error);
    }
  }

  /**
   * Delete a subdomain object.
   * @param req the express request.
   * @param res the express response.
   */
  async deleteSubdomain(req: Request, res: Response): Promise<void> {
    const { subdomain } = req.body;

    const deleteSubdomainUseCase = new DeleteSubdomainUseCase(this.subdomainRepository, this.doService);
    try {
      deleteSubdomainUseCase.setRequestParam({ subdomain });
      const response = await deleteSubdomainUseCase.execute();
      if (response.success === false) {
        throw response.error;
      }

      res.status(202).json({ subdomain: response.payload });
    } catch (error) {
      this.jsonError(res, error);
    }
  }
}
