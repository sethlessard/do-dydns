import { View } from "./View";

export interface IPView extends View {

  /**
   * Show the public IP address.
   * @param ipAddress the IP address to show.
   */
  showPublicIPAddress(ipAddress: string): void;
}
