import axios from "axios";

export const FETCH_SETTINGS_ERROR = "FETCH_SETTINGS_ERROR";
export const SAVE_SETTINGS_ERROR = "SAVE_SETTINGS_ERROR";
export const UPDATE_SETTINGS = "UPDATE_SETTINGS";

/**
 * Fetch API key error.
 * @param {any} err any error that occurs.
 * @returns {{type: string, error: any}} the redux action.
 */
export const fetchSettingsError = (err) => ({
  type: FETCH_SETTINGS_ERROR,
  error: err
});

/**
 * Request to fetch the settings.
 */
export const fetchSettings = () => {
  return (dispatch) => {
    axios({
      url: `http://${window.location.hostname}:3080/settings`
    })
      .then(res => dispatch(updateSettings(res.data)))
      .catch(err => dispatch(fetchSettingsError(err)));
  };
};

/**
 * Request to save the settings.
 * @param {{ _id: string, apiToken: string, networkUpdateIntervalMinutes: number }} settings the settings.
 */
export const saveSettings = (settings) => {
  return (dispatch, state) => {
    axios({
      url: `http://${window.location.hostname}:3080/settings`,
      method: "put",
      data: settings
    })
      .then(res => dispatch(updateSettings(res.data)))
      .catch(err => dispatch(saveSettingsError(err)));
  };
};

/**
 * Save settings error.
 * @param {any} err any error that occurs.
 * @returns {{type: string, error: any}} the redux action.
 */
export const saveSettingsError = (err) => ({
  type: SAVE_SETTINGS_ERROR,
  error: err
});

/**
 * Update the settings
 * @param {{ apiKey: string, networkUpdateIntervalMinutes: number }} settings the settings.
 * @returns {{type: string, apiKey: string}} the redux action.
 */
export const updateSettings = (settings) => ({
  type: UPDATE_SETTINGS,
  settings
});
