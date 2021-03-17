import axios from "axios";
import { inject } from "tsyringe";
import { IPService, OnIPAddressChangedListener } from "../../../domain/datasources/services/IPService";

// TODO: test
export class IPServiceImpl implements IPService {

  private static readonly IP_URL = "https://ifconfig.me/ip";
  private static readonly IP_REGEX = /(\d{1,3}\.){3}\d{1,3}/;

  readonly #listeners: OnIPAddressChangedListener[];
  readonly #refreshInterval: number;
  #lastKnownIP: string;
  #timer: NodeJS.Timeout;

  /**
   * Create a new IPServiceImpl instance.
   * @param refreshIntervalMinutes the refresh interval, in minutes.
   */
  constructor(
    @inject("ipRefreshIntervalMinutes") refreshIntervalMinutes: number,
    @inject("lastKnownIP") lastKnownIP: string
  ) {
    this.#refreshInterval = refreshIntervalMinutes;
    this.#lastKnownIP = lastKnownIP;
    this.#listeners = [];

    // bind 
    this._loop = this._loop.bind(this);
  }

  /**
 * Register a listener function to be called when the public-facing IP address changes.
 * @param listener the OnIPAddressChangedListener.
 */
  onIPAddressChanged(listener: OnIPAddressChangedListener): void {
    this.#listeners.push(listener);
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
    this.#timer = setInterval(() => this._loop(), this.#refreshInterval ?? 15 * 1000 * 60);
    this._loop();
  }

  /**
   * Check for changes in the public-facing IP address and alert any listeners
   * that the IP address has changed.
   */
  private _loop(): void {
    axios(IPServiceImpl.IP_URL)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.data as string;
        }
        throw new Error("Couldn't get the public-facing IP Address: " + response.statusText);
      })
      .then(ipAddress => ipAddress.trim())
      .then(ipAddress => {
        if (IPServiceImpl.IP_REGEX.test(ipAddress) && ipAddress !== this.#lastKnownIP) {
          // alert the listeners about the new IP address
          this.#listeners.forEach(l => l(ipAddress));
        }
        this.#lastKnownIP = ipAddress;
      });

  }
}
