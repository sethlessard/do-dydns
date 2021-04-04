import { Request, Response } from "express";
import { container, injectable } from "tsyringe";

import { CreateNewSubdomainUseCase } from "../../domain/usecases/subdomain/CreateNewSubdomainUseCase/CreateNewSubdomainUseCase";
import { DeleteSubdomainUseCase } from "../../domain/usecases/subdomain/DeleteSubdomainUseCase/DeleteSubdomainUseCase";
import { GetAllSubdomainsForDomainUseCase } from "../../domain/usecases/subdomain/GetAllSubdomainsForDomainUseCase/GetAllSubdomainsForDomainUseCase";
import { UpdateSubdomainUseCase } from "../../domain/usecases/subdomain/UpdateSubdomainUseCase/UpdateSubdomainUseCase";
import { ExpressController } from "./ExpressController";
import {
  ApiSubdomainArrayResponse,
  ApiSubdomainEntity,
  ApiSubdomainResponse,
} from "@do-dydns/api-definition";

@injectable()
export class SubdomainController extends ExpressController {
  /**
   * Create a new subdomain.
   * @param req the express request.
   * @param res the express response.
   */
  async createNewSubdomain(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    const { domain } = req.params;
    // TODO: verify subdomain body and subdomain url param match
    // TODO: validate subdomain

    const createNewSubdomainUseCase = container.resolve(
      CreateNewSubdomainUseCase
    );
    try {
      createNewSubdomainUseCase.setRequestParam({ domain, name });
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

    const getSubdomainsForDomainUseCase = container.resolve(
      GetAllSubdomainsForDomainUseCase
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
    const subdomain = req.body as ApiSubdomainEntity;
    // TODO: verify subdomain body and subdomain url param match
    // TODO: validate subdomain

    const updateSubdomainUseCase = container.resolve(UpdateSubdomainUseCase);
    try {
      updateSubdomainUseCase.setRequestParam({
        subdomain: Object.assign(subdomain, { digitalOceanID: -1 }),
      });
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
    const subdomain = req.body as ApiSubdomainEntity;
    // TODO: verify subdomain body and subdomain url param match
    // TODO: validate subdomain

    const deleteSubdomainUseCase = container.resolve(DeleteSubdomainUseCase);
    try {
      deleteSubdomainUseCase.setRequestParam({
        subdomain: Object.assign(subdomain, { digitalOceanID: -1 }),
      });
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
