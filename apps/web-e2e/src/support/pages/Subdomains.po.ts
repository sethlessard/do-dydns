import { BasePage } from "./Base.po";

/**
 * Get the domain toolbar.
 */
const getSubdomainsToolbar = () => cy.get("[id=domains-toolbar]");

/**
 * Get the domain toolbar title.
 */
const getSubdomainsToolbarTitle = () =>
  getSubdomainsToolbar().contains("Subdomains");

/**
 * Get the domains container.
 */
const getSubdomainsContainer = () => cy.get(`[id=subdomains]`);

/**
 * Get the subdomain card.
 * @param subdomain the subdomain.
 */
const getSubdomainCard = (subdomain: string) =>
  getSubdomainsContainer().get(`[id='subdomain-${subdomain}']`);

/**
 * Get the Anchor button on a subdomain card.
 * @param subdomain the subdomain.
 */
const getSubdomainCardAnchorButton = (subdomain: string) =>
  getSubdomainCard(subdomain).get(`button[text*="Anchor"]`);

/**
 * Get the Detach button on a domain card.
 * @param domain the domain.
 */
const getSubdomainCardDetachButton = (domain: string) =>
  getSubdomainCard(domain).get(`button[text*="Detach"]`);

export class SubdomainsPage {
  static apiCallScenarios = Object.assign(BasePage.apiCallScenarios, {
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
     * Navigate to the subdomains page for the domain.
     * @param domain the domain.
     */
    iNavigateToTheSubdomainsPageForDomain: (
      domain: "example.com" | "example2.com"
    ) => {
      let intercept = SubdomainsPage.apiCallScenarios.getSubdomainsFor_example_com_Success();
      if (domain === "example2.com") {
        intercept = SubdomainsPage.apiCallScenarios.getSubdomainsFor_example2_com_Success();
      }
      BasePage.Given.iNavigateToPageWithUrlHashAndUseIntercepts(
        `/domain/${domain}/subdomains`,
        [intercept]
      );
    },
  });

  static When = Object.assign(BasePage.When, {
    /**
     * Click on the back button.
     */
    iClickOnTheBackButton: () => {
      //  TODO: implement
    },

    /**
     * Click on the anchor button on a subdomain card.
     * @param subdomain the subdomain.
     */
    iClickOnTheAnchorButtonOnSubdomain: (subdomain: string) => {
      getSubdomainCardAnchorButton(subdomain).click();
    },

    /**
     * Click on the detach button on a subdomain card.
     * @param subdomain the subdomain.
     */
    iClickOnTheDetachButtonOnDomain: (subdomain: string) => {
      getSubdomainCardDetachButton(subdomain).click();
    },
  });

  static Then = Object.assign(BasePage.Then, {
    /**
     * Verify that the subdomains page is visited.
     */
    iShouldBeOnTheSubdomainsPage: () => {
      SubdomainsPage.Then.iShouldSeeTheSubdomainsToolbarTitle();
    },

    /**
     * The subdomains should load from the API.
     */
    iShouldSeeAllOfTheSubdomainsLoadForDomain: (
      domain: "example.com" | "example2.com"
    ) => {
      cy.wait(`@${domain}.subdomains.get.success`);
    },

    /**
     * The "Subdomains" toolbar title should be visible.
     */
    iShouldSeeTheSubdomainsToolbarTitle: () => {
      getSubdomainsToolbarTitle().contains("Subdomains");
    },

    /**
     * The subdomain should be visible.
     * @param subdomain the name of the subdomain.
     */
    iShouldSeeThisSubdomain: (subdomain: string) => {
      cy.get("[id=domains]").contains(subdomain);
    },

    /**
     * The subdomain should be anchored.
     * @param subdomain the subdomain that should be unattached.
     */
    iShouldSeeThisAnchoredSubdomain: (subdomain: string) => {
      SubdomainsPage.Then.iShouldSeeThisSubdomain(subdomain);
      getSubdomainCardDetachButton(subdomain);
    },

    /**
     * The subdomain should be unattached.
     * @param subdomain the subdomain that should be unattached.
     */
    iShouldSeeThisDetachedSubomainInTheList: (subdomain: string) => {
      SubdomainsPage.Then.iShouldSeeThisSubdomain(subdomain);
      getSubdomainCardAnchorButton(subdomain);
    },
  });
}
