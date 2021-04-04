import axios from "axios";
import {
  IPService,
  OnIPAddressChangedListener,
} from "../../../domain/datasources/services/IPService";

// TODO: test
export class IPServiceImpl implements IPService {
  private static readonly IP_URL = "https://ifconfig.me/ip";
  private static readonly IP_REGEX = /(\d{1,3}\.){3}\d{1,3}/;

  readonly #listeners: OnIPAddressChangedListener[];

  #refreshIntervalMinutes = 15;
  #lastKnownIP = "";
  #timer: NodeJS.Timeout;

  /**
   * Create a new IPServiceImpl instance.
   */
  constructor() {
    this.#listeners = [];

    // bind
    this.onIPAddressChanged = this.onIPAddressChanged.bind(this);
    this.stopWatchingForChanges = this.stopWatchingForChanges.bind(this);
    this.watchForIPChanges = this.watchForIPChanges.bind(this);
  }

  /**
   * Check for changes in the public-facing IP address.
   * @returns the current public-facing IP address.
   */
  readonly checkForChanges = (): Promise<string> => {
    // get the current public-facing IP address
    return (
      axios(IPServiceImpl.IP_URL)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return (response.data as string).trim();
          }
          throw new Error(
            "Couldn't get the public-facing IP Address: " + response.statusText
          );
        })
        // check for changes in the ip
        .then((ipAddress) => {
          if (
            IPServiceImpl.IP_REGEX.test(ipAddress) &&
            ipAddress !== this.#lastKnownIP
          ) {
            // alert the listeners about the new IP address
            this.#listeners.forEach((l) => l(ipAddress));
          }
          this.#lastKnownIP = ipAddress;
          return ipAddress;
        })
    );
  };

  /**
   * Register a listener function to be called when the public-facing IP address changes.
   * @param listener the OnIPAddressChangedListener.
   */
  onIPAddressChanged(listener: OnIPAddressChangedListener): void {
    this.#listeners.push(listener);
  }

  /**
   * Set the last known public-facing IP address.
   * @param ip the last known public-facing IP address.
   */
  setLastKnownIP(ip: string): void {
    this.#lastKnownIP = ip;
  }

  /**
   * Set the refresh interval of the IP service.
   * This method automatically restarts the IP watching service.
   * @param intervalMinutes the refresh interval in minutes.
   */
  setRefreshIntervalMinutes(intervalMinutes: number): void {
    this.#refreshIntervalMinutes = intervalMinutes;
    this.stopWatchingForChanges();
    this.watchForIPChanges();
  }

  /**
   * Stop watching.
   */
  stopWatchingForChanges(): void {
    if (this.#timer) {
      clearInterval(this.#timer);
    }
  }

  /**
   * Start watching for changes in the public-facing IP address.
   */
  watchForIPChanges(): void {
    this.#timer = setInterval(
      () => this.checkForChanges(),
      this.#refreshIntervalMinutes ?? 15 * 1000 * 60
    );
    this.checkForChanges();
  }
}
