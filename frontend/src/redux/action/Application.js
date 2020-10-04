import axios from "axios";

export const FETCH_DOMAINS_FAILURE = "FETCH_DOMAINS_FAILURE";
export const FETCH_DOMAINS_SUCCESS = "FETCH_DOMAINS_SUCCESS";
export const FETCH_LOGS_FAILURE = "FETCH_LOGS_FAILURE";
export const FETCH_LOGS_SUCCESS = "FETCH_LOGS_SUCCESS";
export const FETCH_PUBLIC_IP_FAILURE = "FETCH_PUBLIC_IP_FAILURE";
export const FETCH_PUBLIC_IP_SUCCESS = "FETCH_PUBLIC_IP_SUCCESS";
export const FETCH_SUBDOMAINS_FAILURE = "FETCH_SUBDOMAINS_FAILURE";
export const FETCH_SUBDOMAINS_SUCCESS = "FETCH_SUBDOMAINS_SUCCESS";

export const UPDATE_DOMAIN_FAILURE = "UPDATE_DOMAIN_FAILURE";
export const UPDATE_DOMAIN_SUCCESS = "UPDATE_DOMAIN_SUCCESS";

/**
 * Fetch the domains.
 * @returns {{ type: string }} the redux action.
 */
export const fetchDomains = () => {
  return (dispatch) => {
    return axios({
      url: `http://${window.location.hostname}:3080/domain`
    })
      .then(res => dispatch(fetchDomainsSuccess(res.data)))
      .catch(err => dispatch(fetchDomainsFailure(err)));
  };
};

/**
 * Set domains fetch error.
 * @param {any} err the error, if any.
 * @returns {{ type: string }} the redux action.
 */
export const fetchDomainsFailure = (err) => ({
  type: FETCH_DOMAINS_FAILURE,
  error: err
});

/**
 * Update the domains in the state.
 * @param {string} domains the domains.
 * @returns {{ type: string }} the redux action.
 */
export const fetchDomainsSuccess = (domains) => ({
  type: FETCH_DOMAINS_SUCCESS,
  domains
});

/**
 * Fetch the logs.
 * @returns {{ type: string }} the redux action.
 */
export const fetchLogs = () => {
  return (dispatch) => {
    return axios({
      url: `http://${window.location.hostname}:3080/log`
    })
      .then(res => dispatch(fetchLogsSuccess(res.data)))
      .catch(err => dispatch(fetchLogsFailure(err)));
  };
};

/**
 * Set logs fetch error.
 * @param {any} err the error, if any.
 * @returns {{ type: string }} the redux action.
 */
export const fetchLogsFailure = (err) => ({
  type: FETCH_LOGS_FAILURE,
  error: err
});

/**
 * Update the logs in the state.
 * @param {string} logs the logs.
 * @returns {{ type: string }} the redux action.
 */
export const fetchLogsSuccess = (logs) => ({
  type: FETCH_LOGS_SUCCESS,
  logs
});

/**
 * Fetch the current public ip address.
 * @returns {{ type: string }} the redux action.
 */
export const fetchPublicIP = () => {
  return (dispatch) => {
    axios.get(`http://${window.location.hostname}:3080/ip`)
      .then(res => dispatch(fetchPublicIPSuccess(res.data.ip)))
      .catch(err => dispatch(fetchPublicIPFailure(err))); 
  };
}

/**
 * Set public ip fetch error.
 * @param {any} err the error, if any.
 * @returns {{ type: string }} the redux action.
 */
export const fetchPublicIPFailure = (err) => ({
  type: FETCH_PUBLIC_IP_FAILURE,
  error: err
});

/**
 * Update the value of the public ip in the state.
 * @param {string} publicIP the public ip.
 * @returns {{ type: string }} the redux action.
 */
export const fetchPublicIPSuccess = (publicIP) => ({
  type: FETCH_PUBLIC_IP_SUCCESS,
  publicIP
});

/**
 * Fetch the subdomains.
 * @returns {{ type: string }} the redux action.
 */
export const fetchSubdomains = () => {
  return (dispatch) => {
    return axios({
      url: `http://${window.location.hostname}:3080/subdomain`
    })
      .then(res => dispatch(fetchSubdomainsSuccess(res.data)))
      .catch(err => dispatch(fetchSubdomainsFailure(err)));
  };
};

/**
 * Set subdomains fetch error.
 * @param {any} err the error, if any.
 * @returns {{ type: string }} the redux action.
 */
export const fetchSubdomainsFailure = (err) => ({
  type: FETCH_SUBDOMAINS_FAILURE,
  error: err
});

/**
 * Update the subdomains in the state.
 * @param {string} publicIP the public ip.
 * @returns {{ type: string }} the redux action.
 */
export const fetchSubdomainsSuccess = (subdomains) => ({
  type: FETCH_SUBDOMAINS_SUCCESS,
  subdomains
});

/**
 * Update a domain.
 * @param {{ _id: string, name: string, ttl: number, zone_file: string, active: boolean }} domain the domain.
 */
export const updateDomain = (domain) => {
  return (dispatch) => {
    return axios({
      url: `http://${window.location.hostname}:3080/domain/${domain._id}`,
      method: "PUT",
      data: domain
    })
      .then(res => dispatch(updateDomainSuccess(res.data)))
      .catch(err => dispatch(updateDomainFailure(err)));
  };
};

/**
 * Called when updating a domain results in an error.
 * @param {any} err the error.
 */
const updateDomainFailure = (err) => ({
  type: UPDATE_DOMAIN_FAILURE,
  error: err
});

/**
 * Called when a domain is successfully updated.
 * @param {{ _id: string, name: string, ttl: number, zone_file: string, active: boolean }} domain the updated domain.
 */
const updateDomainSuccess = (domain) => ({
  type: UPDATE_DOMAIN_SUCCESS,
  domain
});
