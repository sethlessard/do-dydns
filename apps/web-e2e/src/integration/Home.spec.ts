import { HomePage } from "../support/pages/Home.po";
import { LogsPage } from "../support/pages/Logs.po";
import { SettingsPage } from "../support/pages/Settings.po";
import { SubdomainsPage } from "../support/pages/Subdomains.po";

describe("Home Page", () => {
  it("should display the title", () => {
    HomePage.Given.iNavigateToTheHomePageWithNoAPIKey();
    HomePage.Then.iShouldSeeTheSettingsLoad();
    HomePage.Then.iShouldSeeTheApplicationTitle();
    HomePage.Then.iShouldSeeTheIPAddressInTheAppbar("1.2.3.4");
  });

  it("should show the setup page if no API key is registered", () => {
    HomePage.Given.iNavigateToTheHomePageWithNoAPIKey();
    HomePage.Then.iShouldSeeTheSettingsLoad();
    HomePage.Then.iShouldSeeTheDomainsToolbarTitle();
    HomePage.Then.iShouldSeeTheSetupPage();
  });

  it("should navigate to the settings page from the appbar", () => {
    HomePage.Given.iNavigateToTheHomePageWithNoAPIKey();
    HomePage.Then.iShouldSeeTheAppbarMoreMenuButton();
    HomePage.When.iClickOnTheAppbarMoreMenu();
    HomePage.When.iSelectAppbarMoreMenuItem("Settings");
    SettingsPage.Then.iShouldBeOnTheSettingsPage();
  });

  it("should navigate to the about page from the appbar", () => {
    HomePage.Given.iNavigateToTheHomePageWithNoAPIKey();
    HomePage.Then.iShouldSeeTheAppbarMoreMenuButton();
    HomePage.When.iClickOnTheAppbarMoreMenu();
    HomePage.When.iSelectAppbarMoreMenuItem("About");
    //  TODO: About.Then.iShouldBeOnTheAboutPage();
  });

  it("should navigate to the logs page from the nav drawer", () => {
    HomePage.Given.iNavigateToTheHomePageWithNoAPIKey();
    HomePage.When.iOpenTheNavDrawer();
    HomePage.When.iClickOnTheNavLinkWithText("Logs");
    LogsPage.Then.iShouldBeOnTheLogsPage();
  });

  it("should navigate to the settings page from the nav drawer", () => {
    HomePage.Given.iNavigateToTheHomePageWithNoAPIKey();
    HomePage.When.iOpenTheNavDrawer();
    HomePage.When.iClickOnTheNavLinkWithText("Settings");
    SettingsPage.Then.iShouldBeOnTheSettingsPage();
  });

  it("should display the user's domains after the user setup is complete", () => {
    HomePage.Given.iNavigateToTheHomePageWithDomains();
    HomePage.Then.iShouldSeeTheSettingsLoad();
    HomePage.Then.iShouldSeeTheDomainsLoad();
    HomePage.Then.iShouldSeeThisDomainInTheList("example.com");
    HomePage.Then.iShouldSeeThisDomainInTheList("example2.com");
  });

  it("if there are no subdomains, it should indicate so", () => {
    HomePage.Given.iNavigateToTheHomePageWithDomains();
    HomePage.Then.iShouldSeeTheSettingsLoad();
    HomePage.Then.iShouldSeeTheDomainsLoad();
    HomePage.Then.iShouldSeeThisDomainInTheList("example.com");
    HomePage.Then.iShouldSeeThisDomainInTheList("example2.com");
    HomePage.Then.iShouldSeeThisText(
      "There are no subdomains attached to example.com"
    );
    HomePage.Then.iShouldSeeThisText(
      "There are no subdomains attached to example2.com"
    );
  });

  it("should display some of the subdomains", () => {
    HomePage.Given.iNavigateToTheHomePageWithDomainsAndSubdomains();
    HomePage.Then.iShouldSeeTheSettingsLoad();
    HomePage.Then.iShouldSeeTheDomainsLoad();
    HomePage.Then.iShouldSeeAllOfTheSubdomainsLoad();
    HomePage.Then.iShouldSeeThisDomainInTheList("example.com");
    HomePage.Then.iShouldSeeThisSubdomainWithinTheDomainCard(
      "example.com",
      "example.com"
    );
    HomePage.Then.iShouldSeeThisSubdomainWithinTheDomainCard(
      "subdomain1.example.com",
      "example.com"
    );
    HomePage.Then.iShouldSeeThisSubdomainWithinTheDomainCard(
      "subdomain2.example.com",
      "example.com"
    );
    HomePage.Then.iShouldSeeThisDomainInTheList("example2.com");
    HomePage.Then.iShouldSeeThisSubdomainWithinTheDomainCard(
      "example2.com",
      "example2.com"
    );
    HomePage.Then.iShouldSeeThisSubdomainWithinTheDomainCard(
      "subdomain1.example2.com",
      "example2.com"
    );
    HomePage.Then.iShouldSeeThisSubdomainWithinTheDomainCard(
      "subdomain2.example2.com",
      "example2.com"
    );
  });

  it("should anchor a domain", () => {
    HomePage.Given.iNavigateToTheHomePageWithDomainsAndSubdomains();
    HomePage.Then.iShouldSeeTheSettingsLoad();
    HomePage.Then.iShouldSeeTheDomainsLoad();
    HomePage.Then.iShouldSeeAllOfTheSubdomainsLoad();
    HomePage.Then.iShouldSeeThisDomainInTheList("example2.com");
    HomePage.Then.iShouldSeeThisDetachedDomainInTheList("example2.com");
    HomePage.When.iClickOnTheAnchorButtonOnDomain("example2.com");
    HomePage.Then.iShouldSeeThisAnchoredDomainInTheList("example2.com");
    HomePage.Then.iShouldSeeThisText("'example.com' has been anchored to DO-DyDns. Updating IP to: '1.2.3.4'");
  });

  it("should detach a domain", () => {
    HomePage.Given.iNavigateToTheHomePageWithDomainsAndSubdomains();
    HomePage.Then.iShouldSeeTheSettingsLoad();
    HomePage.Then.iShouldSeeTheDomainsLoad();
    HomePage.Then.iShouldSeeAllOfTheSubdomainsLoad();
    HomePage.Then.iShouldSeeThisDomainInTheList("example.com");
    HomePage.Then.iShouldSeeThisAnchoredDomainInTheList("example.com");
    HomePage.When.iClickOnTheDetachButtonOnDomain("example.com");
    HomePage.Then.iShouldSeeThisDetachedDomainInTheList("example.com");
    HomePage.Then.iShouldSeeThisText("'example.com' has been detached from DO-DyDns.")
  });

  it("should navigate to the domain's subdomains", () => {
    HomePage.Given.iNavigateToTheHomePageWithDomainsAndSubdomains();
    HomePage.Then.iShouldSeeTheSettingsLoad();
    HomePage.Then.iShouldSeeTheDomainsLoad();
    HomePage.Then.iShouldSeeAllOfTheSubdomainsLoad();
    HomePage.Then.iShouldSeeThisDomainInTheList("example.com");
    HomePage.When.iClickOnTheDomainArrowButton("example.com");
    SubdomainsPage.Then.iShouldBeOnTheSubdomainsPage();
  });
});
