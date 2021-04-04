import {
  ApiSettingsResponseEntity,
  ApiSettingsResponse,
} from "@do-dydns/api-definition";
import { BasePage } from "./Base.po";

/**
 * Get the api key input field.
 */
const getApiKeyInput = () => cy.get("[id=settings-input-apikey]");

/**
 * Get the API Key button.
 */
const getApiKeyResetButton = () => cy.get("[id=settings-button-apikey-reset]");

/**
 * Get the network update interval input field.
 */
const getPublicIPAddressUpdateIntervalInput = () =>
  cy.get("[id=settings-input-interval-ipaddress-update]");

/**
 * Get the network update interval input field.
 */
const getDigitalOceanUpdateIntervalInput = () =>
  cy.get("[id=settings-input-digitalocean-update-interval]");

/**
 * Get the reset button.
 */
const getResetButton = () => cy.get("[id=settings-button-reset]");

/**
 * Get the save button.
 */
const getSaveButton = () => cy.get("[id=settings-button-save]");

export class SettingsPage {
  // apiCallScenarios: {
  //   getSettingsNoApiKeySuccess: () => () => cy.intercept({method: "GET", url: "/api/v1/settings"})
  // };

  static Given = Object.assign(BasePage.Given, {
    /**
     * Navigate to the settings page.
     * @param settings the settings to use.
     */
    iNavigateToTheSettingsPage: async (
      settings: Partial<ApiSettingsResponseEntity>
    ) => {
      // mock the api calls
      const settingsEntity: ApiSettingsResponseEntity = {
        id: "0",
        apiKey: settings.apiKey ?? "",
        publicIPUpdateInterval: settings.publicIPUpdateInterval ?? 15,
        digitalOceanUpdateInterval: settings.digitalOceanUpdateInterval ?? 15,
        created: settings.created ?? Date.now(),
        updated: settings.updated ?? Date.now(),
      };
      const settingsResponse: ApiSettingsResponse = {
        success: true,
        settings: settingsEntity,
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
          apiKey: "",
          publicIPUpdateInterval: 15,
          digitalOceanUpdateInterval: 15,
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
      getPublicIPAddressUpdateIntervalInput()
        .clear()
        .type(networkUpdateInterval);
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
      getApiKeyResetButton();
      getDigitalOceanUpdateIntervalInput();
      getPublicIPAddressUpdateIntervalInput();
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
     * @param publicIPUpdateInterval the public IP address update interval.
     */
    iShouldSeeTheNetworkUpdateIntervalAs: (publicIPUpdateInterval: string) => {
      getPublicIPAddressUpdateIntervalInput().should(
        "have.value",
        publicIPUpdateInterval
      );
    },

    /**
     * Verify that the settings were reset.
     */
    theSettingsShouldBeReset: () => {
      cy.wait("@resetSettings");
      getApiKeyInput().should("have.value", "");
      getPublicIPAddressUpdateIntervalInput().should("have.value", "15");
    },

    /**
     * Verify that the settings were saved.
     * @param settings the settings to see.
     */
    theseSettingsShouldBeSaved: (
      settings: Omit<ApiSettingsResponseEntity, "id" | "created" | "updated">
    ) => {
      cy.wait("@saveSettings").then((intercept) => {
        expect(intercept.request.body.publicIPUpdateInterval).to.eq(
          settings.publicIPUpdateInterval,
          "The API request had the wrong public IP update interval!"
        );
        expect(intercept.request.body.digitalOceanUpdateInterval).to.eq(
          settings.digitalOceanUpdateInterval,
          "The API request had the wrong Digital Ocean update interval!"
        );
        expect(intercept.request.body.apiKey).to.eq(
          settings.apiKey,
          "The API request had the wrong network update interval!"
        );
      });
      getApiKeyInput().should("have.value", settings.apiKey);
      getPublicIPAddressUpdateIntervalInput().should(
        "have.value",
        settings.apiKey
      );
    },
  });
}
