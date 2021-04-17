import { ApiEntity } from "./ApiEntity";

export interface ApiSubdomainEntity extends ApiEntity {
  /**
   * The name of the domain that owns the subdomain.
   */
  domain: string;

  /**
   * The id of the domain that owns the subdomain.
   */
  domainID: number;

  /**
   * The subdomain name
   *  Ex: (accounts).google.com
   */
  name: string;

  /**
   * The name  of the A record
   *    Ex: @ => google.com
   *    Ex: 'accounts' => (accounts).google.com
   */
  aRecordName: string;

  /**
   * The full subdomain name
   *  Ex. accounts.google.com
   */
  fullName: string;

  /**
   * The IPv4 address.
   */
  ip: string;

  /**
   * Whether or not the subdomain is managed by the DO-DyDns system.
   */
  active: boolean;

  /**
   * The time-to-live value.
   */
  ttl: number;
}
