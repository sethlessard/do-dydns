import axios from "axios";
import { Action } from "redux";
import DomainModel from "../../model/DomainModel";
import LogModel from "../../model/LogModel";
import SubdomainModel from "../../model/SubdomainModel";
import ErrorAction from "./types/ErrorAction";

const PORT = process.env.REACT_APP_API_PORT || 3080;
const url = `http://${window.location.hostname}:${PORT}`;

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
export const UPDATE_SUBDOMAIN_FAILURE = "UPDATE_SUBDOMAIN_FAILURE";
export const UPDATE_SUBDOMAIN_SUCCESS = "UPDATE_SUBDOMAIN_SUCCESS";

export interface FetchDomainsAction extends Action {
  domains: DomainModel[];
}
export interface FetchLogsAction extends Action {
  logs: LogModel[];
}
export interface FetchPublicIPAction extends Action {
  publicIP: string;
}
export interface FetchSubdomainsAction extends Action {
  subdomains: SubdomainModel[];
}
export interface UpdateDomainAction extends Action {
  domain: DomainModel;
}
export interface UpdateSubdomainAction extends Action {
  subdomain: SubdomainModel;
}

/**
 * Fetch the domains.
 * @returns  the redux action.
 */
export const fetchDomains = () => {
  // @ts-ignore
  return (dispatch) => {
    return axios({
      url: `${url}/domain`
    })
      .then(res => dispatch(fetchDomainsSuccess(res.data)))
      .catch(err => dispatch(fetchDomainsFailure(err)));
  };
};

/**
 * Set domains fetch error.
 * @param err the error, if any.
 * @returns the redux action.
 */
export const fetchDomainsFailure = (err: Error | string): ErrorAction => ({
  type: FETCH_DOMAINS_FAILURE,
  error: err
});

/**
 * Update the domains in the state.
 * @param domains the domains.
 * @returns  the redux action.
 */
export const fetchDomainsSuccess = (domains: DomainModel[]): FetchDomainsAction => ({
  type: FETCH_DOMAINS_SUCCESS,
  domains
});

/**
 * Fetch the logs.
 * @returns the redux action.
 */
export const fetchLogs = () => {
  // @ts-ignore
  return (dispatch) => {
    return axios({
      url: `${url}/log`
    })
      .then(res => dispatch(fetchLogsSuccess(res.data)))
      .catch(err => dispatch(fetchLogsFailure(err)));
  };
};

/**
 * Set logs fetch error.
 * @param err the error, if any.
 * @returns the redux action.
 */
export const fetchLogsFailure = (err: Error | string): ErrorAction => ({
  type: FETCH_LOGS_FAILURE,
  error: err
});

/**
 * Update the logs in the state.
 * @param logs the logs.
 * @returns the redux action.
 */
export const fetchLogsSuccess = (logs: LogModel[]): FetchLogsAction => ({
  type: FETCH_LOGS_SUCCESS,
  logs
});

/**
 * Fetch the current public ip address.
 * @returns the redux action.
 */
export const fetchPublicIP = () => {
  // @ts-ignore
  return (dispatch) => {
    axios.get(`${url}/ip`)
      .then(res => dispatch(fetchPublicIPSuccess(res.data.ip)))
      .catch(err => dispatch(fetchPublicIPFailure(err))); 
  };
}

/**
 * Set public ip fetch error.
 * @param err the error, if any.
 * @returns the redux action.
 */
export const fetchPublicIPFailure = (err: Error | string): ErrorAction => ({
  type: FETCH_PUBLIC_IP_FAILURE,
  error: err
});

/**
 * Update the value of the public ip in the state.
 * @param publicIP the public ip.
 * @returns the redux action.
 */
export const fetchPublicIPSuccess = (publicIP: string): FetchPublicIPAction => ({
  type: FETCH_PUBLIC_IP_SUCCESS,
  publicIP
});

/**
 * Fetch the subdomains.
 */
export const fetchSubdomains = () => {
  // @ts-ignore
  return (dispatch) => {
    return axios({
      url: `${url}/subdomain`
    })
      .then(res => dispatch(fetchSubdomainsSuccess(res.data)))
      .catch(err => dispatch(fetchSubdomainsFailure(err)));
  };
};

/**
 * Set subdomains fetch error.
 * @param err the error, if any.
 * @returns the redux action.
 */
export const fetchSubdomainsFailure = (err: Error | string): ErrorAction => ({
  type: FETCH_SUBDOMAINS_FAILURE,
  error: err
});

/**
 * Update the subdomains in the state.
 * @param publicIP the public ip.
 * @returns the redux action.
 */
export const fetchSubdomainsSuccess = (subdomains: SubdomainModel[]): FetchSubdomainsAction => ({
  type: FETCH_SUBDOMAINS_SUCCESS,
  subdomains
});

/**
 * Update a domain.
 * @param domain the domain.
 */
export const updateDomain = (domain: DomainModel) => {
  // @ts-ignore
  return (dispatch) => {
    return axios({
      url: `${url}/domain/${domain._id}`,
      method: "PUT",
      data: domain
    })
      .then(res => dispatch(updateDomainSuccess(res.data)))
      .then(() => dispatch(fetchSubdomains()))
      .catch(err => dispatch(updateDomainFailure(err)));
  };
};

/**
 * Called when updating a domain results in an error.
 * @param err the error.
 */
const updateDomainFailure = (err: Error | string): ErrorAction => ({
  type: UPDATE_DOMAIN_FAILURE,
  error: err
});

/**
 * Called when a domain is successfully updated.
 * @param domain the updated domain.
 */
const updateDomainSuccess = (domain: DomainModel): UpdateDomainAction => ({
  type: UPDATE_DOMAIN_SUCCESS,
  domain
});

/**
 * Update a subdomain.
 * @param subdomain the subdomain.
 */
export const updateSubdomain = (subdomain: SubdomainModel) => {
  // @ts-ignore
  return (dispatch) => {
    return axios({
      url: `${url}/subdomain/${subdomain._id}`,
      method: "PUT",
      data: subdomain
    })
      .then(res => dispatch(updateSubdomainSuccess(res.data)))
      .then(() => dispatch(fetchSubdomains()))
      .catch(err => dispatch(updateSubdomainFailure(err)));
  };
};

/**
 * Called when updating a domain results in an error.
 * @param err the error.
 */
const updateSubdomainFailure = (err: Error | string): ErrorAction => ({
  type: UPDATE_SUBDOMAIN_FAILURE,
  error: err
});

/**
 * Called when a domain is successfully updated.
 * @param subdomain the updated domain.
 */
const updateSubdomainSuccess = (subdomain: SubdomainModel): UpdateSubdomainAction => ({
  type: UPDATE_SUBDOMAIN_SUCCESS,
  subdomain
});
