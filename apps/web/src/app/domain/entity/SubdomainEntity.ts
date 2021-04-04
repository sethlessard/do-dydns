import { StoredEntity } from "./StoredEntity";

export interface SubdomainEntity extends StoredEntity {
  /**
   * The name of the domain that owns the subdomain.
   */
  domain: string;

  /**
   * The id of the domain that owns the subdomain.
   */
  domainID: string;

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
