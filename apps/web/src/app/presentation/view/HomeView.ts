import { DomainEntity } from "../../domain/entity/DomainEntity";
import { View } from "./View";
import { SubdomainEntity } from "../../domain/entity/SubdomainEntity";

export interface HomeView extends View {
  /**
   * Display the Digital Ocean api key setup screen.
   */
  showApiKeySetup(): void;

  /**
   * Show the domains & subdomains.
   * @param domainsAndSubdomains.
   */
  showDomainsAndSubdomains(
    domainsAndSubdomains: {
      domain: DomainEntity;
      subdomains: SubdomainEntity[];
    }[]
  ): void;
}
