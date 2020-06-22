const { exec } = require("child_process");
const lowdb = require("lowdb");
const FileAdapter = require("lowdb/adapters/FileSync");

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
    this._db = new lowdb(new FileAdapter("do-dydns.json"));

    // write the defaults
    this._db.defaults({ publicIP: "", lastUpdated: 0 })
      .write();

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
      exec("curl -s ifconfig.me", (err, stdout, stderr) => {
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
    return new Promise((resolve, reject) => {
      resolve(this._db.get("publicIP").value());
    });
  }

  _setLastKnownIP(ip) {
    this._db.set("publicIP", ip)
    .write();
  }
}

module.exports = getIPManagerInstance;
