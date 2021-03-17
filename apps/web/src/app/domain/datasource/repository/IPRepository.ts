export interface IPRepository {

  /**
   * Get the current IP address.
   * @returns the IP address.
   */
  getCurrentIPAddress(): Promise<string>;
}
