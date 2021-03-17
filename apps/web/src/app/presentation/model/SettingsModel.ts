import Model from "./Model";

interface SettingsModel extends Model {
  _id: "0";
  apiKey: string;
  networkUpdateIntervalMinutes: number;
}

export default SettingsModel;
