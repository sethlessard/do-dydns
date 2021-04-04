import { Column, Entity } from "typeorm";
import { StoredModel } from "./StoredModel";

@Entity()
export class SubdomainModel extends StoredModel {
  /**
   * The name of the domain that owns the subdomain.
   */
  @Column()
  domain: string;

  /**
   * The id of the domain that owns the subdomain.
   */
  @Column()
  domainID: string;

  /**
   * The digital ocean ID.
   */
  @Column()
  digitalOceanID: number;

  /**
   * The subdomain name
   *  Ex: (accounts.)google.com
   */
  @Column()
  name: string;

  /**
   * The name  of the A record
   *    Ex: @ => google.com
   *    Ex: 'accounts' => (accounts).google.com
   */
  @Column()
  aRecordName: string;

  /**
   * The full subdomain name
   *  Ex. accounts.google.com
   */
  @Column()
  fullName: string;

  /**
   * The IPv4 address.
   */
  @Column()
  ip: string;

  /**
   * Whether or not the subdomain is managed by the DO-DyDns system.
   */
  @Column()
  active: boolean;

  /**
   * The time-to-live value.
   */
  @Column()
  ttl: number;
}
