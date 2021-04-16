import {
  ApiSettingsResponseEntity,
  ApiSettingsResponse,
  ApiSettingsRequestEntity,
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
  static apiCallScenarios = {
    /**
     * Get the settings with no api key set.
     */
    getSettingsNoApiKeySuccess: () => () =>
      cy
        .intercept(
          { method: "GET", url: "/api/v1/settings" },
          { fixture: "./settings/GetSettingsNoApiKey.success.json" }
        )
        .as("settings.get.success"),

    /**
     * Get the settings with the api key.
     */
    getSettingsWithApiKeySuccess: () => () =>
      cy
        .intercept(
          { method: "GET", url: "/api/v1/settings" },
          { fixture: "./settings/GetSettingsWithApiKey.success.json" }
        )
        .as("settings.get.success"),

    /**
     * Get the settings with an api key and then reload defaults
     */
    getSettingsThenReloadDefaults: () => () => {
      let count = 0;
      return cy
        .intercept({ method: "GET", url: "/api/v1/settings" }, (res) => {
          if (count === 0) {
            res.reply({
              fixture: "./settings/GetSettingsWithApiKey.success.json",
            });
          } else {
            res.reply({
              fixture: "./settings/GetSettingsNoApiKey.success.json",
            });
          }
          count++;
        })
        .as("settings.get.success");
    },
  };

  static Given = Object.assign(BasePage.Given, {
    /**
     * Navigate to the settings page.
     */
    iNavigateToTheSettingsPageWithApiKey: () => {
      BasePage.Given.iNavigateToPageWithUrlHashAndUseIntercepts("/settings", [
        SettingsPage.apiCallScenarios.getSettingsWithApiKeySuccess(),
      ]);
    },

    /**
     * Navigate to the settings page.
     */
    iNavigateToTheSettingsPageNoApiKey: () => {
      BasePage.Given.iNavigateToPageWithUrlHashAndUseIntercepts("/settings", [
        SettingsPage.apiCallScenarios.getSettingsNoApiKeySuccess(),
      ]);
    },

    /**
     *
     */
    iNavigateToTheSettingsPageAwaitingAReloadDefaults: () => {
      BasePage.Given.iNavigateToPageWithUrlHashAndUseIntercepts("/settings", [
        SettingsPage.apiCallScenarios.getSettingsThenReloadDefaults(),
      ]);
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
     * The settings should load from the DO-DyDns api
     */
    iShouldSeeTheSettingsLoad: () => {
      cy.wait("@settings.get.success");
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
      cy.wait("@settings.get.success");
      getApiKeyInput().should("have.value", "");
      getPublicIPAddressUpdateIntervalInput().should("have.value", "15");
    },

    /**
     * Verify that the settings were saved.
     * @param settings the settings to see.
     */
    theseSettingsShouldBeSaved: (
      settings: Omit<ApiSettingsRequestEntity, "id" | "created" | "updated">
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
