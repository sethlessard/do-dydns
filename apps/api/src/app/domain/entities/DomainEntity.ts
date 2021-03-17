import { StoredEntity } from "./StoredEntity";

// TODO: at the presentation level, hide zoneFile
export interface DomainEntity extends StoredEntity {

  /**
   * The name of the domain.
   */
  name: string;

  /**
   * Whether or not the domain is tracked by the DO-DyDns system.
   */
  active: boolean;

  /**
   * The time-to-live value.
   */
  ttl: number;

  /**
   * The zone file.
   */
  zoneFile: string;
}
