import { Column, Entity } from "typeorm";
import { StoredModel } from "./StoredModel";

@Entity()
export class DomainModel extends StoredModel {

  /**
   * The full name of the domain
   */
  @Column()
  name: string;

  /**
   * The time-to-live value.
   */
  @Column()
  ttl: number;

  /**
   * The domain's DNS zone file. 
   */
  @Column()
  zoneFile: string;

  /**
   * Whether or not the domain is tracked by the DO-DyDns system.
   */
  @Column()
  active: boolean;
}
