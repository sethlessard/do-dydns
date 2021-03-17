export interface IPRepository {

  /**
   * Get the current IP Address.
   * @returns the current public IP address.
   */
  getIP(): Promise<string>;

  /**
   * Update the current public IP Address.
   * @param ip the IP Address.
   * @returns the IP Address.
   */
  updateIP(ip: string): Promise<string>;
}
