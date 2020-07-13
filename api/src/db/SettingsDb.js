const Database = require("./Database");

let _instance = null;

/**
 * Get the SettingsDb instance.
 * @returns {SettingsDb} the SettingsDb instance.
 */
const getSettingsDbInstance = () => {
  if (_instance === null) {
    _instance = new SettingsDb();
  }
  return _instance;
};

class SettingsDb extends Database {

  constructor() {
    super({ name: "Settings" });
  }
 
  _initialize() {
    return this.insert({
      _id: "0",
      apiKey: "",
      networkUpdateInterval: 1000 * 60 * 15
    });
  }
}

module.exports = getSettingsDbInstance;
