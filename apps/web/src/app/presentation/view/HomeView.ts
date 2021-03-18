import { DomainEntity } from "../../domain/entity/DomainEntity";
import { View } from "./View";

export interface HomeView extends View {
  
  /**
   * Show the domains.
   * @param domains the domains.
   */
  showDomains(domains: DomainEntity[]): void;
}
