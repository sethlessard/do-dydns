import axios from "axios";

export const FETCH_API_KEY_ERROR = "FETCH_API_KEY_ERROR";
export const UPDATE_API_KEY = "UPDATE_API_KEY";

/**
 * Fetch API key error.
 * @param {any} err any error that occurs.
 * @returns {{type: string, error: any}} the redux action.
 */
export const fetchApiKeyError = (err) => ({
  type: FETCH_API_KEY_ERROR,
  error: err
});

/**
 * Reguest to fetch the api key.
 */
export const fetchApiKeyRequest = () => {
  return (dispatch) => {
    axios({
      url: "http://localhost:3080/settings/apiKey"
    })
      .then(res => dispatch(updateApiKey(res.data.apiKey)))
      .catch(err => dispatch(fetchApiKeyError(err)));
  };
};

/**
 * Update the DigitalOcean API key.
 * @param {string} apiKey the API key.
 * @returns {{type: string, apiKey: string}} the redux action.
 */
export const updateApiKey = (apiKey) => ({
  type: UPDATE_API_KEY,
  apiKey
});
