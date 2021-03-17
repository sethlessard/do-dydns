
/**
 * JSON representation of a DNS zone file.
 */
export interface ZoneFileEntity {
  
  /**
   * The domain that the zone file is responsible for.
   */
  "$origin": string;

  /**
   * The time-to-live value
   */
  "$ttl": number;

  soa?: {
    mname: string,
    rname: string,
    serial: string,
    refresh: number,
    retry: number,
    expire: number,
    minimum: number
  };

  /**
   * The name servers.
   */
  ns: { host: string }[];

  /**
   * A name entries (IPv4 subdomains)
   */
  a: {
    name: string,
    ip: string
  }[];

  /**
   * AAAA name entries (IPv4 subdomains)
   */
  aaaa: {
    ip: string,
    name?: string
  }[];

  /**
   * CNAME entries
   */
  cname: {
    name: string,
    alias: string
  }[];

  /**
   * MX entries
   */
  mx: {
    preference: number,
    host: string
  }[];

  /**
   * TXT entries.
   */
  txt: {
    name: string,
    txt: string
  }[];

  /**
   * SRV entries.
   */
  srv: {
    name: string,
    target: string,
    priority: number,
    weight: number,
    port: number
  }[];
}
