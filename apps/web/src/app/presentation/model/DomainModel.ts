import Model from "./Model";

export interface DomainModel extends Model {
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
}