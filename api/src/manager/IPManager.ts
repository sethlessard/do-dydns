import { exec } from "child_process";
import { promisify } from "util";

const pExec = promisify(exec);

import IPDb from "../db/IPDb";

class IPManager {

  private static _instance?: IPManager;

  /**
   * Get the IPManager instance.
   */
  static getInstance(): IPManager {
    if (!IPManager._instance) {
      IPManager._instance = new IPManager();
    }
    return IPManager._instance;
  }

  private readonly _db: IPDb;

  constructor() {
    this._db = IPDb.getInstance();

    // binding
    this.getCurrentIP = this.getCurrentIP.bind(this);
    this.getLastKnownIP = this.getLastKnownIP.bind(this);
    this._setLastKnownIP = this._setLastKnownIP.bind(this);
  }

  /**
   * Get the current public IP address.
   * @returns a promise returning the public IP address
   */
  getCurrentIP(): Promise<string> {
    return pExec("curl -s https://api.ipify.org/")
      .then(({ stdout, stderr }) => {
        if (stderr) throw stderr;
        return stdout;
      });
  }

  /**
   * Get the last known IP address.
   * @returns a promise returning the last known public ip address.
   */
  getLastKnownIP(): Promise<string> {
    return this._db.get("0")
      .then(ipInfo => (ipInfo) ? ipInfo.publicIP : "");
  }

  /**
   * Store the last known ip address in the database.
   * @param ip the ip.
   */
  _setLastKnownIP(ip: string) {
    return this._db.update({ _id: "0", publicIP: ip });
  }
}

export default IPManager;
