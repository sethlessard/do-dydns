import axios, { AxiosResponse } from "axios";
import { injectable } from "tsyringe";
import { DOService } from "../../../domain/datasources/services/DOService";
import { DODomainEntity } from "../../../domain/entities/digitalocean/DODomainEntity";
import { DODomainRecordEntity } from "../../../domain/entities/digitalocean/DODomainRecordEntity";


type Domain = {
  name: string;
  ttl: number;
  zone_file: string;
};
type CreateDomainResponse = {
  domain: Domain;
}
type CreateSubdomainResponse = {
  domain_record: DODomainRecordEntity;
}
type GetDomainsResponse = {
  domains: Domain[];
};

// TODO: test
@injectable()
export class DOV2ServiceImpl implements DOService {

  private static readonly URL = "https://api.digitalocean.com/v2";
  private static readonly DEFAULT_TTL = 1800;

  #apiKey?: string;

  /**
   * Create a new DOV2ServiceImpl instance.
   */
  constructor() {
    // binding
    this._delete = this._delete.bind(this);
    this._get = this._get.bind(this);
    this._post = this._post.bind(this);
  }

  /**
   * Create a domain in DigitalOcean.
   * @param name the name of the domain.
   * @param ip the public IPv4 address to use for the domain.
   * @returns the created domain respose from DigitalOcean.
   */
  createDomain(name: string, ip: string): Promise<DODomainEntity> {
    return this._post("/domains", { name, ip_address: ip })
      .then(response => {
        const { domain } = response.data as CreateDomainResponse;
        return { name: domain.name, ttl: domain.ttl, zoneFile: domain.zone_file };
      });
  }
  /**
   * Create a subdomain in DigitalOcean.
   * @param name the name of the subdomain.
   * @param domain the name of the domain.
   * @param ip the public IPv4 address to use for the domain.
   * @returns the created subdomain response from DigitalOcean.
   */
  createSubdomain(name: string, domain: string, ip: string): Promise<DODomainRecordEntity> {
    const subdomainOptions = {
      type: "A",
      name,
      data: ip,
      ttl: DOV2ServiceImpl.DEFAULT_TTL
    };
    return this._post(`/domains/${domain}/records`, subdomainOptions)
      .then(response => {
        if (response.status !== 201) {
          throw new Error(`Error creating the subdomain '${name}' for domain '${domain}' in DigitalOcean`);
        }
        return (response.data as CreateSubdomainResponse).domain_record;
      });
  }

  /**
   * Delete a domain in DigitalOcean.
   * @param name the name of the domain.
   * @returns the delete domain response from DigitalOcean.
   */
  deleteDomain(name: string): Promise<void> {
    return this._delete(`/domains/${name}`)
      .then(response => {
        if (response.status !== 204) {
          throw new Error(`Error deleting the domain '${name}' from DigitalOcean`);
        }
      });
  }

  /**
   * Delete a subdomain in DigitalOcean.
   * @param domainRecordID the id assigned to the A record of the subdomain.
   * @param domain the name of the domain.
   * @returns the deleted subdomain response from DigitalOcean.
   */
  deleteSubdomain(domainRecordID: string, domain: string): Promise<void> {
    return this._delete(`/domains/${domain}/records/${domainRecordID}`)
      .then(response => {
        if (response.status !== 204) {
          throw new Error(`Error deleting the A record with id '${domainRecordID}' of domain '${domain}' from DigitalOcean.`);
        }
      });
  }

  /**
   * Get the most up-to-date data regarding the registered
   * domains and subdomains with DigitalOcean.
   * @returns the most up-to-date data.
   */
  refreshDomainsAndSubdomains(): Promise<DODomainEntity[]> {
    return this._get("/domains")
      .then(response => (response.data as GetDomainsResponse).domains.map(d => ({ name: d.name, ttl: d.ttl, zoneFile: d.zone_file })));
  }

  /**
   * Update the DigitalOcean api key.
   * @param apiKey the DigitalOcean api key.
   */
  updateApiKey(apiKey: string): void {
    this.#apiKey = apiKey;
  }

  /**
   * Update the IP address of some domains/subdomains.
   * @param domains an object representing the domains/subdomains to update.
   * The key name is the domain, and the value is an array of subdomain names to update.
   * @param ip the public IPv4 address.
   * @returns the updated records reposnse from DigitalOcean.
   */
  updateIPOfDomainsAndSubdomains(domains: { [domainName: string]: string[] }, ip: string): Promise<DODomainRecordEntity[]> {
    throw new Error("Method not implemented." + domains + ip);
  }

  /**
   * DELETE request on a DigitalOcean api endpoint.
   * @param urlHash the DigitalOcean api url hash to DELETE.
   */
  private _delete(urlHash: string): Promise<AxiosResponse> {
    return axios.delete(`${DOV2ServiceImpl.URL}${urlHash}`, {
      headers: {
        Authorization: `Bearer ${this.#apiKey}`
      }
    });
  }

  /**
   * GET request on a DigitalOcean api endpoint.
   * @param urlHash the digital ocean api url hash to get.
   * @returns the axios response.
   */
  private _get(urlHash: string): Promise<AxiosResponse> {
    return axios.get(`${DOV2ServiceImpl.URL}${urlHash}`, {
      headers: {
        Authorization: `Bearer ${this.#apiKey}`
      }
    });
  }

  /**
   * POST data to a DigitalOcean api url.
   * @param urlHash the DigitalOcean url hash to post.
   * @param data the data
   * @returns the response.
   */
  private _post(urlHash: string, data: unknown): Promise<AxiosResponse> {
    return axios.post(`${DOV2ServiceImpl.URL}${urlHash}`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${this.#apiKey}`,
        "Content-Type": "application/json"
      }
    });
  }

  // /**
  //  * PUT data to a DigitalOcean api url.
  //  * @param urlHash the DigitalOcean url hash to put.
  //  * @param data the data to put.
  //  * @returns the response.
  //  */
  // private _put(urlHash: string, data: unknown): Promise<AxiosResponse> {
  //   return axios.put(`${DOV2ServiceImpl.URL}${urlHash}`, JSON.stringify(data), {
  //     headers: {
  //       Authorization: `Bearer ${this.#apiKey}`,
  //       "Content-Type": "application/json"
  //     }
  //   });
  // }
}
