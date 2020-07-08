import axios from "axios";

class DODynDnsController {

  /**
   * DODynDnsController.
   * @param {DODynDnsApp} doDyDnsView the view.
   */
  constructor(doDyDnsView) {
    this._doDyDnsView = doDyDnsView;
  }

  /**
   * Initialize the view.
   */
  initializeView() {
    this._getCurrentIP();
  }

  _getCurrentIP() {
    axios({
      url: "http://localhost:3080/ip"
    })
      .then(ipRes => this._doDyDnsView.showIPAddress(ipRes.data.ip))
      .catch(err => this._doDyDnsView.showError(err));
  }
}

export default DODynDnsController;
