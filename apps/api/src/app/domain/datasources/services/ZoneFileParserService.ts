import { ZoneFileEntity } from "../../entities/ZoneFileEntity";

export interface ZoneFileParserService {

  /**
   * Parse a zone file into its JSON representation.
   * @param zoneFileTxt the zone file txt.
   * @returns the zone file in JSON form.
   */
  parseZoneFile(zoneFileTxt: string): ZoneFileEntity;
}
