import {
  DELETE_LOGS_FAILURE,
  DELETE_LOGS_SUCCESS,
  FetchDomainsAction,
  FetchLogsAction,
  FetchPublicIPAction,
  FetchSubdomainsAction,
  FETCH_DOMAINS_FAILURE,
  FETCH_DOMAINS_SUCCESS,
  FETCH_LOGS_FAILURE,
  FETCH_LOGS_SUCCESS,
  FETCH_PUBLIC_IP_FAILURE,
  FETCH_PUBLIC_IP_SUCCESS,
  FETCH_SUBDOMAINS_FAILURE,
  FETCH_SUBDOMAINS_SUCCESS,
  UpdateDomainAction,
  UpdateSubdomainAction,
  UPDATE_DOMAIN_FAILURE,
  UPDATE_DOMAIN_SUCCESS,
  UPDATE_SUBDOMAIN_FAILURE,
  UPDATE_SUBDOMAIN_SUCCESS
} from "../action/Application";

import _ from "lodash";
import { Action } from "redux";
import DomainModel from "../../model/DomainModel";
import LogModel from "../../model/LogModel";
import SubdomainModel from "../../model/SubdomainModel";

export interface ApplicationState {
  domains: DomainModel[];
  logs: LogModel[];
  publicIP: string;
  subdomains: SubdomainModel[];
}

const ApplicationReducer = (state: ApplicationState = {
  domains: [],
  logs: [],
  publicIP: "x.x.x.x",
  subdomains: []
}, action: Action) => {
  let newState = Object.assign({} as ApplicationState, state);

  switch (action.type) {
    case DELETE_LOGS_FAILURE:
      // TODO: implement
      break;
    case DELETE_LOGS_SUCCESS:
      newState.logs = [];
      break;
    case FETCH_DOMAINS_FAILURE:
      // TODO: implement
      break;
    case FETCH_DOMAINS_SUCCESS:
      newState.domains = (action as FetchDomainsAction).domains;
      break;
    case FETCH_LOGS_FAILURE:
      // TODO: implement
      break;
    case FETCH_LOGS_SUCCESS:
      newState.logs = (action as FetchLogsAction).logs;
      break;
    case FETCH_PUBLIC_IP_FAILURE:
      // TODO: implement
      break;
    case FETCH_PUBLIC_IP_SUCCESS:
      newState.publicIP = (action as FetchPublicIPAction).publicIP;
      break;
    case FETCH_SUBDOMAINS_FAILURE:
      // TODO: implement
      break;
    case FETCH_SUBDOMAINS_SUCCESS:
      newState.subdomains = (action as FetchSubdomainsAction).subdomains;
      break;
    case UPDATE_DOMAIN_FAILURE:
      // TODO: implement
      break;
    case UPDATE_DOMAIN_SUCCESS:
      newState = updateDomain(newState, (action as UpdateDomainAction).domain);
      break;
    case UPDATE_SUBDOMAIN_FAILURE:
      // TODO: implement
      break;
    case UPDATE_SUBDOMAIN_SUCCESS:
      newState = updateSubdomain(newState, (action as UpdateSubdomainAction).subdomain);
      break;
    default:
      break;
  }

  return newState;
};

/**
 * Update a domain in the redux state
 * @param state the state
 * @param domain the domain.
 */
const updateDomain = (state: ApplicationState, domain: DomainModel) => {
  const idx = _.findIndex(state.domains, (d) => d._id === domain._id);
  if (idx !== -1) {
    state.domains[idx] = domain;
  }
  return state;
};

/**
 * Update a subdomain in the redux state
 * @param state the state
 * @param subdomain the subdomain.
 */
const updateSubdomain = (state: ApplicationState, subdomain: SubdomainModel) => {
  const idx = _.findIndex(state.subdomains, (s) => s._id === subdomain._id);
  if (idx !== -1) {
    state.subdomains[idx] = subdomain;
  }
  return state;
};

export default ApplicationReducer;
