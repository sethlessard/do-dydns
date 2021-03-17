export interface DODomainEntity {

  /**
   * The name of the domain.
   */
  name: string;

  /**
   * The time-to-live value.
   */
  ttl: number;

  /**
   * The zone file.
   */
  zoneFile: string;
}
