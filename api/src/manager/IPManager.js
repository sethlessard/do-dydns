const { exec } = require("child_process");
const lowdb = require("lowdb");
const FileAdapter = require("lowdb/adapters/FileSync");
const getIPDbInstance = require("../db/IPDb");

let _instance = null;

/**
 * Get the IP Manager instance.
 * @returns {IPManager} the IPManager instance.
 */
const getIPManagerInstance = () => {
  if (_instance == null) _instance = new IPManager();
  return _instance;
};

class IPManager {

  constructor() {
    this._db = getIPDbInstance();

    // binding
    this.getCurrentIP = this.getCurrentIP.bind(this);
    this.getLastKnownIP = this.getLastKnownIP.bind(this);
    this._setLastKnownIP = this._setLastKnownIP.bind(this);
  }

  /**
   * Get the current public IP address.
   * @returns {Promise<string>} a promise returning the public IP address
   */
  getCurrentIP() {
    return new Promise((resolve, reject) => {
      exec("curl -s https://api.ipify.org/", (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else if (stderr) {
          reject(stderr);
        } else {
          this._setLastKnownIP(stdout);
          resolve(stdout);
        }
      });
    });
  }

  /**
   * Get the last known IP address.
   * @returns {Promise<string>} a promise returning the last known public ip address.
   */
  getLastKnownIP() {
    return this._db.get("0")
      .then(ipInfo => (ipInfo) ? ipInfo.publicIP : "");
  }

  /**
   * Store the last known ip address in the database.
   * @param {string} ip the ip.
   */
  _setLastKnownIP(ip) {
    return this._db.update({ _id: "0", publicIP: ip });
  }
}

module.exports = getIPManagerInstance;
