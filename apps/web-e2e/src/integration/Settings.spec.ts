import { SettingsPage } from "../support/pages/Settings.po";

describe("Settings Page", () => {
  beforeEach(() => {
    SettingsPage.Given.iNavigateToTheSettingsPage({
      apiKeyValid: true,
      publicIPUpdateInterval: 20,
      digitalOceanUpdateInterval: 20,
    });
  });

  afterEach(() => {
    cy.reload();
  });

  it("should show the Settings title in the toolbar", () => {
    SettingsPage.Then.iShouldBeOnTheSettingsPage();
  });

  it("should hide the api key in the placeholder", () => {
    SettingsPage.Then.iShouldSeeTheApiKeyInThePlaceholderAs("********");
  });

  it("should show the public-facing IP Address update interval", () => {
    SettingsPage.Then.iShouldSeeTheNetworkUpdateIntervalAs("20");
  });

  it("should reset all settings, including the api key.", () => {
    SettingsPage.When.iPressTheResetButton();
    SettingsPage.Then.theSettingsShouldBeReset();
  });
  it("should save the settingsPage.", () => {
    SettingsPage.When.iEnterThisValueInTheApiKeyInput("myapikey");
    SettingsPage.When.iEnterThisValueInTheNetworkUpdateIntervalInput("23");
    SettingsPage.When.iPressTheSaveButton();
    SettingsPage.Then.theseSettingsShouldBeSaved({
      apiKeyValid: true,
      publicIPUpdateInterval: 23,
      digitalOceanUpdateInterval: 27,
    });
  });
});
