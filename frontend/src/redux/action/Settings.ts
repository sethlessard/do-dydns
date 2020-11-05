import axios from "axios";
import { Action } from "redux";
import SettingsModel from "../../model/SettingsModel";
import ErrorAction from "./types/ErrorAction";

const PORT = process.env.REACT_APP_API_PORT || 3080;
const url = `http://${window.location.hostname}:${PORT}`;

export const FETCH_SETTINGS_ERROR = "FETCH_SETTINGS_ERROR";
export const SAVE_SETTINGS_ERROR = "SAVE_SETTINGS_ERROR";
export const UPDATE_SETTINGS = "UPDATE_SETTINGS";

export interface UpdateSettingsAction extends Action {
  settings: SettingsModel;
}

/**
 * Fetch API key error.
 * @param err any error that occurs.
 * @returns the redux action.
 */
export const fetchSettingsError = (err: Error | string): ErrorAction => ({
  type: FETCH_SETTINGS_ERROR,
  error: err
});

/**
 * Request to fetch the settings.
 */
export const fetchSettings = () => {
  // @ts-ignore
  return (dispatch) => {
    axios({
      url: `${url}/settings`
    })
      .then(res => dispatch(updateSettings(res.data)))
      .catch(err => dispatch(fetchSettingsError(err)));
  };
};

/**
 * Request to save the settings.
 * @param settings the settings.
 */
export const saveSettings = (settings: SettingsModel) => {
  // @ts-ignore
  return (dispatch) => {
    axios({
      url: `${url}/settings`,
      method: "put",
      data: settings
    })
      .then(res => dispatch(updateSettings(res.data)))
      .catch(err => dispatch(saveSettingsError(err)));
  };
};

/**
 * Save settings error.
 * @param err any error that occurs.
 * @returns the redux action.
 */
export const saveSettingsError = (err: Error | string): ErrorAction => ({
  type: SAVE_SETTINGS_ERROR,
  error: err
});

/**
 * Update the settings
 * @param settings the settings.
 * @returns the redux action.
 */
export const updateSettings = (settings: SettingsModel): UpdateSettingsAction => ({
  type: UPDATE_SETTINGS,
  settings
});
