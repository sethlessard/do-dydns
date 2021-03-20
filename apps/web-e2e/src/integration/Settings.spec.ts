import { Settings } from "../support/pages/Settings.po";

describe("Settings Page", () => {
  beforeEach(() => {
    Settings.Given.iNavigateToTheSettingsPage("asdfasdf", 20);
  });

  afterEach(() => {
    cy.reload();
  });

  it("should show the Settings title in the toolbar", () => {
    Settings.Then.iShouldBeOnTheSettingsPage();
  });

  it("should hide the api key in the placeholder", () => {
    Settings.Then.iShouldSeeTheApiKeyInThePlaceholderAs("********");
  });

  it("should show the network update interval", () => {
    Settings.Then.iShouldSeeTheNetworkUpdateIntervalAs("20");
  });

  it("should reset all settings, including the api key.", () => {
    Settings.When.iPressTheResetButton();
    Settings.Then.theSettingsShouldBeReset();
  });
  it("should save the settings.", () => {
    Settings.When.iEnterThisValueInTheApiKeyInput("myapikey");
    Settings.When.iEnterThisValueInTheNetworkUpdateIntervalInput("23");
    Settings.When.iPressTheSaveButton();
    Settings.Then.theseSettingsShouldBeSaved("myapikey", "23");
  });
});
