import Model from "./Model";

interface SubdomainModel extends Model {
  name: string;
  ttl: number;
  ip: string;
  domain: string;
  active: boolean;
}

export default SubdomainModel;