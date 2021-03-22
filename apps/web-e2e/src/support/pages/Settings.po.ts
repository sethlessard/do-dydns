import { ApiSettingsResponse } from "@do-dydns/api-definition";
import { BasePage } from "./Base.po";

/**
 * Get the api key input field.
 */
const getApiKeyInput = () => cy.get("[id=settings-input-apikey]");

/**
 * Get the network update interval input field.
 */
const getNetworkUpdateIntervalInput = () =>
  cy.get("[id=settings-input-networkinterval]");

/**
 * Get the reset button.
 */
const getResetButton = () => cy.get("[id=settings-button-reset]");

/**
 * Get the save button.
 */
const getSaveButton = () => cy.get("[id=settings-button-save]");

export class SettingsPage {
  // TODO: api calls

  static Given = Object.assign(BasePage.Given, {
    /**
     * Navigate to the settings page.
     * @param apiKey the api key to display
     * @param networkUpdateIntervalMinutes the network update interval to display.
     */
    iNavigateToTheSettingsPage: async (
      apiKey: string,
      networkUpdateIntervalMinutes: number
    ) => {
      // mock the api calls
      const settingsResponse: ApiSettingsResponse = {
        success: true,
        settings: {
          id: "0",
          apiKey,
          networkUpdateIntervalMinutes,
          created: Date.now(),
          updated: Date.now(),
        },
      };
      cy.intercept(
        {
          url: "/api/v1/settings",
          method: "GET",
        },
        settingsResponse
      );
      cy.intercept(
        {
          url: "/api/v1/settings/reset",
          method: "POST",
        },
        Object.assign(settingsResponse, {
          apiKey: "0",
          networkUpdateIntervalMinutes: 15,
        })
      ).as("resetSettings");

      cy.visit("/settings");
    },
  });

  static When = Object.assign(BasePage.When, {
    /**
     * Enter a value in the api key input.
     * @param apiKey the value to enter.
     */
    iEnterThisValueInTheApiKeyInput: (apiKey: string) => {
      getApiKeyInput().clear().type(apiKey);
    },

    /**
     * Enter a value in the network update interval input.
     * @param networkUpdateInterval the value to enter.
     */
    iEnterThisValueInTheNetworkUpdateIntervalInput: (
      networkUpdateInterval: string
    ) => {
      getNetworkUpdateIntervalInput().clear().type(networkUpdateInterval);
    },

    /**
     * Press the reset button.
     */
    iPressTheResetButton: () => {
      getResetButton().click();
    },

    /**
     * Press the save button.
     */
    iPressTheSaveButton: () => {
      cy.intercept({
        url: "/api/v1/settings",
        method: "PUT",
      }).as("saveSettings");
      cy.pause();
      getSaveButton().click();
      // getSaveButton().debug();
    },
  });

  static Then = Object.assign(BasePage.Then, {
    /**
     * Verify the settings page is open.
     */
    iShouldBeOnTheSettingsPage: () => {
      cy.get("[id=settings-toolbar]").contains("Settings");
      getApiKeyInput();
      getNetworkUpdateIntervalInput();
      getResetButton();
      getSaveButton();
    },

    /**
     * Verify the api key (found in the placeholder) matches a specified string.
     * @param apiKey the api key.
     */
    iShouldSeeTheApiKeyInThePlaceholderAs: (apiKey: string) => {
      getApiKeyInput().should("have.attr", "placeholder", apiKey);
    },

    /**
     * Verify the network update interval matches a specified string.
     * @param networkUpdateInterval the network update interval.
     */
    iShouldSeeTheNetworkUpdateIntervalAs: (networkUpdateInterval: string) => {
      getNetworkUpdateIntervalInput().should(
        "have.value",
        networkUpdateInterval
      );
    },

    /**
     * Verify that the settings were reset.
     */
    theSettingsShouldBeReset: () => {
      cy.wait("@resetSettings");
      getApiKeyInput().should("have.value", "");
      getNetworkUpdateIntervalInput().should("have.value", "15");
    },

    /**
     * Verify that the settings were saved.
     * @param apiKey
     * @param networkUpdateInterval
     */
    theseSettingsShouldBeSaved: (
      apiKey: string,
      networkUpdateInterval: string
    ) => {
      cy.wait("@saveSettings").then((intercept) => {
        expect(intercept.request.body.networkUpdateIntervalMinutes).to.eq(
          networkUpdateInterval,
          "The API request had the wrong network update interval!"
        );
        expect(intercept.request.body.apiKey).to.eq(
          apiKey,
          "The API request had the wrong network update interval!"
        );
      });
      getApiKeyInput().should("have.value", apiKey);
      getNetworkUpdateIntervalInput().should(
        "have.value",
        networkUpdateInterval
      );
    },
  });
}
