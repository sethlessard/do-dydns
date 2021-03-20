import {
  ApiDomainEntity,
  ApiGetAllDomainsResponse,
  ApiGetCurrentIPResponse,
} from "@do-dydns/api-definition";

const getDomainToolbar = () => cy.get("[id=domains-toolbar]");
const getDomainToolbarTitle = () => getDomainToolbar().get("h6");

export const Home = {
  Given: {
    /**
     * Navigate to the home page.
     * @param ipAddress the ip address to display
     * @param domains the domains to display
     */
    iNavigateToTheHomePage: (
      ipAddress = "1.2.3.4",
      domains: ApiDomainEntity[] = []
    ) => {
      // mock the api calls
      const domainResponse: ApiGetAllDomainsResponse = {
        success: true,
        domains,
      };
      cy.intercept("/api/v1/domain", { body: domainResponse });
      const ipResponse: ApiGetCurrentIPResponse = {
        success: true,
        ipAddress,
      };
      cy.intercept("/api/v1/ip", { body: ipResponse });

      cy.visit("/");
    },
  },
  When: {},
  Then: {
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
  },
};
