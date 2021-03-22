import { BasePage } from "./Base.po";

/**
 * Get the domain toolbar.
 */
const getDomainToolbar = () => cy.get("[id=domains-toolbar]");

/**
 * Get the domain toolbar title.
 */
const getDomainToolbarTitle = () => getDomainToolbar().contains("Domain");

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
  });

  static Given = Object.assign(BasePage.Given, {
    /**
     * Navigate to the home page.
     */
    iNavigateToTheHomePage: () => {
      BasePage.Given.iNavigateToPageWithUrlHashAndUseIntercepts("/", [
        HomePage.apiCallScenarios.getDomainsSuccess(),
      ]);
    },
  });

  static Then = Object.assign(BasePage.Then, {
    /**
     * The "Domains" toolbar title should be visible.
     */
    iShouldSeeTheDomainsToolbarTitle: () => {
      getDomainToolbarTitle().contains("Domains");
    },
    /**
     * The domain should be visible in the list.
     * @param domain the name of the domain.
     */
    iShouldSeeThisDomainInTheList: (domain: string) => {
      cy.get("[id=domains]").contains(domain);
    },
  });
}
