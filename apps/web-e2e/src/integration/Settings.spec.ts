import { SettingsPage } from "../support/pages/Settings.po";

describe("Settings Page", () => {
  afterEach(() => {
    cy.reload();
  });

  it("should show the Settings title in the toolbar", () => {
    SettingsPage.Given.iNavigateToTheSettingsPageNoApiKey();
    SettingsPage.Then.iShouldBeOnTheSettingsPage();
    SettingsPage.Then.iShouldSeeTheSettingsLoad();
  });

  it("should hide the api key in the placeholder", () => {
    SettingsPage.Given.iNavigateToTheSettingsPageWithApiKey();
    SettingsPage.Then.iShouldSeeTheSettingsLoad();
    SettingsPage.Then.iShouldSeeTheApiKeyInThePlaceholderAs("*".repeat(16));
  });

  it("should show the public-facing IP Address update interval", () => {
    SettingsPage.Given.iNavigateToTheSettingsPageNoApiKey();
    SettingsPage.Then.iShouldSeeTheSettingsLoad();
    SettingsPage.Then.iShouldSeeTheNetworkUpdateIntervalAs("15");
  });

  it("should reset all settings, except the api key.", () => {
    SettingsPage.Given.iNavigateToTheSettingsPageAwaitingAReloadDefaults();
    SettingsPage.Then.iShouldSeeTheSettingsLoad();
    SettingsPage.When.iPressTheResetButton();
    SettingsPage.Then.theSettingsShouldBeReset();
    SettingsPage.Then.iShouldSeeTheApiKeyInThePlaceholderAs("*".repeat(16));
  });

  it("should save the settingsPage.", () => {
    SettingsPage.Given.iNavigateToTheSettingsPageNoApiKey();
    SettingsPage.Then.iShouldSeeTheSettingsLoad();
    SettingsPage.When.iEnterThisValueInTheApiKeyInput("myapikey");
    SettingsPage.When.iEnterThisValueInTheNetworkUpdateIntervalInput("23");
    SettingsPage.When.iPressTheSaveButton();
    SettingsPage.Then.theseSettingsShouldBeSaved({
      apiKey: "myapikey",
      publicIPUpdateInterval: 23,
      digitalOceanUpdateInterval: 15,
    });
  });
});
