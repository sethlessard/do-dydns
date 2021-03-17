
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
   * Stop watching.
   */
  stopWatchingForChanges(): void;

  /**
   * Start watching for changes in the public-facing IP address.
   */
  watchForIPChanges(): void;
}
