import {
  FETCH_DOMAINS_FAILURE,
  FETCH_DOMAINS_SUCCESS,
  FETCH_LOGS_FAILURE,
  FETCH_LOGS_SUCCESS,
  FETCH_PUBLIC_IP_FAILURE,
  FETCH_PUBLIC_IP_SUCCESS,
  FETCH_SUBDOMAINS_FAILURE,
  FETCH_SUBDOMAINS_SUCCESS,
  UPDATE_DOMAIN_FAILURE,
  UPDATE_DOMAIN_SUCCESS
} from "../action/Application";

import _ from "lodash";

const ApplicationReducer = (state = {
  domains: [],
  logs: [],
  publicIP: "x.x.x.x",
  subdomains: []
}, action) => {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case FETCH_DOMAINS_FAILURE:
      // TODO: implement
      break;
    case FETCH_DOMAINS_SUCCESS:
      newState.domains = action.domains;
      break;
    case FETCH_LOGS_FAILURE:
      // TODO: implement
      break;
    case FETCH_LOGS_SUCCESS:
      newState.logs = action.logs;
      break;
    case FETCH_PUBLIC_IP_FAILURE:
      // TODO: implement
      break;
    case FETCH_PUBLIC_IP_SUCCESS:
      newState.publicIP = action.publicIP;
      break;
    case FETCH_SUBDOMAINS_FAILURE:
      // TODO: implement
      break;
    case FETCH_SUBDOMAINS_SUCCESS:
      newState.subdomains = action.subdomains;
      break;
    case UPDATE_DOMAIN_FAILURE:
      // TODO: implement
      break;
    case UPDATE_DOMAIN_SUCCESS:
      newState = updateDomain(newState, action.domain);
      break;
    default:
      break;
  }

  return newState;
};

/**
 * Update a domain in the redux state
 * @param {*} state the state
 * @param {{ _id: string, name: string, ttl: number, zone_file: string, active: boolean }} domain the domain.
 */
const updateDomain = (state, domain) => {
  const idx = _.findIndex(state.domains, (d) => d._id === domain._id);
  if (idx !== -1) {
    state.domains[idx] = domain;
  }
  return state;
}

export default ApplicationReducer;
