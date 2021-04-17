export interface DigitalOceanRepository {
  /**
   * Sync with Digital Ocean.
   */
  syncWithDigitalOcean(): Promise<void>;
}
