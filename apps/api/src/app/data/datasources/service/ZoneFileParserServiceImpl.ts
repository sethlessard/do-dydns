// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { parseZoneFile } from "zone-file";
import { ZoneFileParserService } from "../../../domain/datasources/services/ZoneFileParserService";
import { ZoneFileEntity } from "../../../domain/entities/ZoneFileEntity";

// TODO: test
export class ZoneFileParserServiceImpl implements ZoneFileParserService {

  /**
   * Parse a zone file into its JSON representation.
   * @param zoneFileTxt the zone file txt.
   * @returns the zone file in JSON form.
   */
  parseZoneFile(zoneFileTxt: string): ZoneFileEntity {
    return parseZoneFile(zoneFileTxt) as ZoneFileEntity;
  }
}
