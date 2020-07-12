import {
  FETCH_PUBLIC_IP_FAILURE,
  FETCH_PUBLIC_IP_SUCCESS,
  FETCH_SUBDOMAINS_FAILURE,
  FETCH_SUBDOMAINS_SUCCESS
} from "../action/Application";

const ApplicationReducer = (state = {
  publicIP: "x.x.x.x",
  subdomains: []
}, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
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
