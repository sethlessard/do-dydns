import Model from "./Model";

interface DomainModel extends Model {
  name: string;
  ttl: number;
  zone_file: string;
  active: boolean;
}

export default DomainModel;
