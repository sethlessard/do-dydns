export enum RecordType {
  /**
   * This record type is used to map an IPv4 Address to a hostname.
   */
  A,

  /**
   * This record type is used to map an IPv6 Address to a hostname.
   */
  AAAA,

  /**
   * As specified in RFC-6844, this record type can be used to restrict
   * which certificate authorities are permitted to issues certificates
   * for a domain.
   */
  CAA,

  /**
   * This record type defines an alias for your canonical hostname
   * (defined by A or AAAA).
   */
  CNAME,

  /**
   * This record type is used to define the mail exchanges used for the domain.
   */
  MX,

  /**
   * This record type defines the name servers that are used for this zone.
   */
  NS,

  /**
   * This record type is used to associate a string of text with a hostname,
   * primarily used for verification.
   */
  TXT,

  /**
   * This record type specifies the location (hostname and port number) of
   * servers for specific services.
   */
  SRV,

  /**
   * This record type defines administrative information about the zone.
   *
   * Can only have ttl changed, cannot be deleted.F
   */
  SOA,
}

export interface DODomainRecordEntity {
  /**
   * The DigitalOcean domain id.
   */
  id: number;

  /**
   * The type of DNS record.
   * It's always going to be A for domains/subdomains.
   */
  type: RecordType;

  /**
   * The host name, alias, or service being defined by the record.
   */
  name: string;

  /**
   * Variable data depending on record type.
   *  A -> IPv4 Address
   *  AAAA -> IPv6 Address
   */
  data: string;

  /**
   * The priority for SRV and MX records.
   */
  priority?: number;

  /**
   * The port for SRV records.
   */
  port?: number;

  /**
   * The time-to-live value.
   */
  ttl: number;

  /**
   * The weight for SRV records.
   */
  weight?: number;

  /**
   * An unsigned integer, 0-255, used for CAA records.
   */
  flags: number;

  /**
   * The parameter tag used for CAA records. Valid values are
   * "issue", "issuewild" or "iodef"
   */
  tag: string;
}
