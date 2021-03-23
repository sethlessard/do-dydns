import { SubdomainEntity } from "../../domain/entity/SubdomainEntity";
import { View } from "./View";

export interface SubdomainsView extends View {
  /**
   * Display the subdomains.
   * @param subdomains the subdomains.
   */
  showSubdomains(subdomains: SubdomainEntity[]): void;
}
