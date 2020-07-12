import axios from "axios";

export const FETCH_PUBLIC_IP_REQUEST = "FETCH_PUBLIC_IP_REQUEST";
export const FETCH_PUBLIC_IP_FAILURE = "FETCH_PUBLIC_IP_FAILURE";
export const FETCH_PUBLIC_IP_SUCCESS = "FETCH_PUBLIC_IP_SUCCESS";

export const FETCH_SUBDOMAINS_REQUEST = "FETCH_SUBDOMAINS_REQUEST";
export const FETCH_SUBDOMAINS_FAILURE = "FETCH_SUBDOMAINS_FAILURE";
export const FETCH_SUBDOMAINS_SUCCESS = "FETCH_SUBDOMAINS_SUCCESS";

/**
 * Fetch the current public ip address.
 * @returns {{ type: string }} the redux action.
 */
export const fetchPublicIPRequest = () => {
  return (dispatch) => {
    axios.get("http://localhost:3080/ip")
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
export const fetchSubdomainsRequest = () => {
  return (dispatch) => {
    return axios({
      url: "http://localhost:3080/subdomain"
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