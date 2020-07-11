import axios from "axios";

class DODynDnsController {

  /**
   * DODynDnsController.
   * @param {DODynDnsApp} doDyDnsView the view.
   */
  constructor(doDyDnsView) {
    this._view = doDyDnsView;
  }

  /**
   * Initialize the view.
   */
  initializeView() {
    this._getCurrentIP();
    this._getSubdomains();
  }

  /**
   * Get the current ip address.
   */
  _getCurrentIP() {
    axios({
      url: "http://localhost:3080/ip"
    })
      .then(ipRes => this._view.showIPAddress(ipRes.data.ip))
      .catch(err => this._view.showError(err));
  }

  /**
   * Get all the subdomains.
   */
  _getSubdomains() {
    axios({
      url: "http://localhost:3080/subdomain"
    })
      .then(res => this._view.showSubdomains(res.data))
      .catch(err => this._view.showError(err));
  }
}

export default DODynDnsController;
