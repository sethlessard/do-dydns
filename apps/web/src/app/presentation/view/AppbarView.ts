import { View } from "./View";

export interface AppbarView extends View {
  /**
   * Display the Digital Ocean sync icon.
   * @param show true if it should be shows
   */
  showSyncIcon(show: boolean): void;

  /**
   * Show the public IP address.
   * @param ipAddress the IP address to show.
   */
  showPublicIPAddress(ipAddress: string): void;
}
