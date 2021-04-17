import { BasePage } from "./Base.po";
import { SettingsPage } from "./Settings.po";

/**
 * Get the domain toolbar.
 */
const getDomainToolbar = () => cy.get("[id=domains-toolbar]");

/**
 * Get the domain toolbar title.
 */
const getDomainToolbarTitle = () => getDomainToolbar().contains("Domain");

/**
 * Get the domains container.
 */
const getDomainsContainer = () => cy.get(`[id=domains]`);

/**
 * Get the domain card.
 * @param domain the domain.
 */
const getDomainCard = (domain: string) =>
  getDomainsContainer().find(`[id='domain-${domain}']`);
/**
 * Get the Anchor button on a domain card.
 * @param domain the domain.
 */
const getDomainCardAnchorButton = (domain: string) =>
  getDomainCard(domain).get("button>span").contains("Anchor");

/**
 * Get the Detach button on a domain card.
 * @param domain the domain.
 */
const getDomainCardDetachButton = (domain: string) =>
  getDomainCard(domain).get("button>span").contains("Detach");

export class HomePage {
  static apiCallScenarios = Object.assign(BasePage.apiCallScenarios, {
    /**
     * Intercept the GET domains call (returns all domains)
     */
    getDomainsSuccess: () => () =>
      cy
        .intercept(
          {
            method: "GET",
            url: "/api/v1/domain",
          },
          { fixture: "domains/GetDomains.success.json" }
        )
        .as("domains.get.success"),
    /**
     * Intercept the GET subdomains call that returns the subdomains for example.com
     */
    getSubdomainsFor_example_com_Success: () => () =>
      cy
        .intercept(
          {
            method: "GET",
            url: "/api/v1/domain/example.com/subdomains",
          },
          { fixture: "subdomains/GetSubdomainsFor_example.com_.success.json" }
        )
        .as("example.com.subdomains.get.success"),
    /**
     * Intercept the GET subdomains call that returns the subdomains for example2.com
     */
    getSubdomainsFor_example2_com_Success: () => () =>
      cy
        .intercept(
          {
            method: "GET",
            url: "/api/v1/domain/example2.com/subdomains",
          },
          { fixture: "subdomains/GetSubdomainsFor_example2.com_.success.json" }
        )
        .as("example2.com.subdomains.get.success"),
  });

  static Given = Object.assign(BasePage.Given, {
    /**
     * Navigate to the home page with domains but no subdomains.
     */
    iNavigateToTheHomePageWithDomains: () => {
      BasePage.Given.iNavigateToPageWithUrlHashAndUseIntercepts("/", [
        HomePage.apiCallScenarios.getDomainsSuccess(),
        SettingsPage.apiCallScenarios.getSettingsWithApiKeySuccess(),
      ]);
    },

    /**
     * Navigate to the home page with domains with the subdomains.
     */
    iNavigateToTheHomePageWithDomainsAndSubdomains: () => {
      BasePage.Given.iNavigateToPageWithUrlHashAndUseIntercepts("/", [
        HomePage.apiCallScenarios.getSubdomainsFor_example_com_Success(),
        HomePage.apiCallScenarios.getSubdomainsFor_example2_com_Success(),
        HomePage.apiCallScenarios.getDomainsSuccess(),
        SettingsPage.apiCallScenarios.getSettingsWithApiKeySuccess(),
      ]);
    },

    /**
     * Navigate to the home page and show the setup page.
     */
    iNavigateToTheHomePageWithNoAPIKey: () => {
      BasePage.Given.iNavigateToPageWithUrlHashAndUseIntercepts("/", [
        SettingsPage.apiCallScenarios.getSettingsNoApiKeySuccess(),
      ]);
    },
  });

  static When = Object.assign(BasePage.When, {
    /**
     * Click on the anchor button on a domain card.
     * @param domain the domain.
     */
    iClickOnTheAnchorButtonOnDomain: (domain: string) => {
      getDomainCardAnchorButton(domain).click();
    },

    /**
     * Click on the detach button on a domain card.
     * @param domain the domain.
     */
    iClickOnTheDetachButtonOnDomain: (domain: string) => {
      getDomainCardDetachButton(domain).click();
    },

    /**
     * Click on the arrow button on the domain card.
     * @param domain the domain.
     */
    iClickOnTheDomainArrowButton: (domain: string) => {
      getDomainCard(domain).find("a[href*=subdomains]").click();
    },
  });

  static Then = Object.assign(BasePage.Then, {
    /**
     * The domains should load from the API.
     */
    iShouldSeeTheDomainsLoad: () => {
      cy.wait("@domains.get.success");
    },

    /**
     * The subdomains should load from the API.
     */
    iShouldSeeAllOfTheSubdomainsLoad: () => {
      cy.wait([
        "@example.com.subdomains.get.success",
        "@example2.com.subdomains.get.success",
      ]);
    },

    /**
     * The settings should load
     */
    iShouldSeeTheSettingsLoad: () => {
      cy.wait("@settings.get.success");
    },

    /**
     * The "Domains" toolbar title should be visible.
     */
    iShouldSeeTheDomainsToolbarTitle: () => {
      getDomainToolbarTitle().contains("Domains");
    },

    /**
     * The setup page should be visible
     */
    iShouldSeeTheSetupPage: () => {
      // should see the title
      cy.contains("Get started with Digital Ocean & Dynamic DNS");

      // the api key setup button should be visible
      cy.contains("How to Create an API Key");

      // the api key register button should be visible
      cy.contains("Set your API Key");
    },

    /**
     * The domain should be visible in the list.
     * @param domain the name of the domain.
     */
    iShouldSeeThisDomainInTheList: (domain: string) => {
      cy.get("[id=domains]").contains(domain);
    },

    /**
     * The subdomain should be visible in the domain's subdomain preview list.
     * @param subdomain the subdomain.
     * @param domain the domain.
     */
    iShouldSeeThisSubdomainWithinTheDomainCard: (
      subdomain: string,
      domain: string
    ) => {
      getDomainCard(domain).contains(subdomain);
    },

    /**
     * The domain should be anchored.
     * @param domain the domain that should be unattached.
     */
    iShouldSeeThisAnchoredDomainInTheList: (domain: string) => {
      HomePage.Then.iShouldSeeThisDomainInTheList(domain);
      getDomainCardDetachButton(domain);
    },

    /**
     * The domain should be unattached.
     * @param domain the domain that should be unattached.
     */
    iShouldSeeThisDetachedDomainInTheList: (domain: string) => {
      HomePage.Then.iShouldSeeThisDomainInTheList(domain);
      getDomainCardAnchorButton(domain);
    },
  });
}
