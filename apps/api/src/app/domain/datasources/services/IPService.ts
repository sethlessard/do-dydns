
export type OnIPAddressChangedListener = (newIPAddress: string) => void;

/**
 * A service to watch for changes in the public-facing IP address.
 */
export interface IPService {

  /**
   * Register a listener function to be called when the public-facing IP address changes.
   * @param listener the OnIPAddressChangedListener.
   */
  onIPAddressChanged(listener: OnIPAddressChangedListener): void;

  /**
   * Set the last known public-facing IP address.
   * @param ip the last known public-facing IP address.
   */
  setLastKnownIP(ip: string): void;

  /**
   * Set the refresh interval of the IP service.
   * @param intervalMinutes the refresh interval in minutes.
   */
  setRefreshIntervalMinutes(intervalMinutes: number): void;

  /**
   * Stop watching.
   */
  stopWatchingForChanges(): void;

  /**
   * Start watching for changes in the public-facing IP address.
   */
  watchForIPChanges(): void;
}
