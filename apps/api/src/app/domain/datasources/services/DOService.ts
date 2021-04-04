import { DODomainEntity } from "../../entities/digitalocean/DODomainEntity";
import { DODomainRecordEntity } from "../../entities/digitalocean/DODomainRecordEntity";

/**
 * Digital Ocean service
 */
export interface DOService {
  /**
   * Create a domain in DigitalOcean.
   * @param name the name of the domain.
   * @param ip the public IPv4 address to use for the domain.
   * @returns the created domain response from DigitalOcean.
   */
  createDomain(name: string, ip: string): Promise<DODomainEntity>;

  /**
   * Create a subdomain in DigitalOcean.
   * @param name the name of the subdomain.
   * @param domain the name of the domain.
   * @param ip the public IPv4 address to use for the domain.
   * @returns the created subdomain response from DigitalOcean.
   */
  createSubdomain(
    name: string,
    domain: string,
    ip: string
  ): Promise<DODomainRecordEntity>;

  /**
   * Delete a domain in DigitalOcean.
   * @param name the name of the domain.
   */
  deleteDomain(name: string): Promise<void>;

  /**
   * Delete a subdomain in DigitalOcean.
   * @param name the name of the subdomain.
   * @param domain the name of the domain.
   * @returns the deleted subdomain response from DigitalOcean.
   */
  deleteSubdomain(name: string, domain: string): Promise<void>;

  /**
   * Get the most up-to-date data regarding the registered
   * domains and subdomains with DigitalOcean.
   * @returns the most up-to-date data.
   */
  refreshDomainsAndSubdomains(): Promise<DODomainEntity[]>;

  /**
   * Update the DigitalOcean api key.
   * @param apiKey the DigitalOcean api key.
   */
  updateApiKey(apiKey: string): void;

  /**
   * Update the IP address of some domains/subdomains.
   * @param domains an object representing the domains/subdomains to update.
   * The key name is the domain, and the value is an array of subdomain names.
   * @param ip the public IPv4 address.
   * @returns the updated records response from DigitalOcean.
   */
  updateIPOfDomainsAndSubdomains(
    domains: { [domainName: string]: string[] },
    ip: string
  ): Promise<DODomainRecordEntity[]>;
}
