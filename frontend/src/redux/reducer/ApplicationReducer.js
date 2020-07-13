import {
  FETCH_DOMAINS_FAILURE,
  FETCH_DOMAINS_SUCCESS,
  FETCH_LOGS_FAILURE,
  FETCH_LOGS_SUCCESS,
  FETCH_PUBLIC_IP_FAILURE,
  FETCH_PUBLIC_IP_SUCCESS,
  FETCH_SUBDOMAINS_FAILURE,
  FETCH_SUBDOMAINS_SUCCESS
} from "../action/Application";

const ApplicationReducer = (state = {
  domains: [],
  logs: [],
  publicIP: "x.x.x.x",
  subdomains: []
}, action) => {
  const newState = Object.assign({}, state);

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
    default:
      break;
  }

  return newState;
};

export default ApplicationReducer;
