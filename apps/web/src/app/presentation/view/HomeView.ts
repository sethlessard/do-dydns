import { DomainModel } from "../model/DomainModel";
import { View } from "./View";

export interface HomeView extends View {
  
  /**
   * Show the domains.
   * @param domains the domains.
   */
  showDomains(domains: DomainModel[]): void;

  /**
   * Show the public IP address.
   * @param ipAddress the IP address to show.
   */
  showPublicIPAddress(ipAddress: string): void;
}
