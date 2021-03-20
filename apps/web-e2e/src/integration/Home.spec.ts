import { All } from "../support/pages/All.po";
import { Home } from "../support/pages/Home.po";
import { Settings } from "../support/pages/Settings.po";
import { Logs } from "../support/pages/Logs.po";

describe("Home Page", () => {
  beforeEach(() => {
    Home.Given.iNavigateToTheHomePage("1.2.3.4", [
      {
        id: "asdlfjaskldfj0",
        active: true,
        created: Date.now(),
        updated: Date.now(),
        name: "example.com",
        ttl: 1800,
      },
      {
        id: "hgdghkfhmwfs3",
        active: true,
        created: Date.now(),
        updated: Date.now(),
        name: "example2.com",
        ttl: 1800,
      },
    ]);
  });

  it("should display the title", () => {
    All.Then.iShouldSeeTheApplicationTitle();
    All.Then.iShouldSeeTheIPAddressInTheAppbar("1.2.3.4");
  });

  it("should show the Domains section", () => {
    Home.Then.iShouldSeeTheDomainsToolbarTitle();
    Home.Then.iShouldSeeThisDomainInTheList("example.com");
    Home.Then.iShouldSeeThisDomainInTheList("example2.com");
  });

  it("should navigate to the settings page from the appbar", () => {
    All.Then.iShouldSeeTheAppbarMoreMenuButton();
    All.When.iClickOnTheAppbarMoreMenu();
    All.When.iSelectAppbarMoreMenuItem("Settings");
  });

  it("should navigate to the about page from the appbar", () => {
    All.Then.iShouldSeeTheAppbarMoreMenuButton();
    All.When.iClickOnTheAppbarMoreMenu();
    All.When.iSelectAppbarMoreMenuItem("About");
  });

  it("should navigate to the logs page from the nav drawer", () => {
    All.When.iOpenTheNavDrawer();
    All.When.iClickOnTheNavLinkWithText("Logs");
    Logs.Then.iShouldBeOnTheLogsPage();
  });

  it("should navigate to the settings page from the nav drawer", () => {
    All.When.iOpenTheNavDrawer();
    All.When.iClickOnTheNavLinkWithText("Settings");
    Settings.Then.iShouldBeOnTheSettingsPage();
  });
});
