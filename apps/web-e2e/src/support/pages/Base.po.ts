/**
 * Get the application title.
 */
const getApplicationTitle = () => cy.get("[id=app-title]");

/**
 * Get the Appbar more menu Icon button
 */
const getAppbarMoreMenuIconButton = () => cy.get("[id=appbar-iconbutton-more]");

/**
 * Get the Appbar more menu.
 */
const getAppbarMoreMenu = () => cy.get("[id=appbar-menu-more]");

/**
 * Get the nav drawer.
 */
const getNavDrawer = () => cy.get("[id=nav-drawer]");

export class BasePage {
  /**
   * The DO-DyDns application api calls
   */
  static apiCallScenarios = {
    /**
     * Mock the GET /api/v1/ip call
     */
    getIPSuccess: () => () =>
      cy
        .intercept(
          { method: "GET", url: "/api/v1/ip" },
          { fixture: "ip/GetIP.success.json" }
        )
        .as("ip.get.success"),
  };

  /**
   * The page assumptions
   */
  static Given = {
    /**
     * Navigate to a page and intercept some api calls.
     * @param urlHash the url of the page to navigate to.
     * @param initialIntercepts the api intercepts to register.
     */
    iNavigateToPageWithUrlHashAndUseIntercepts: (
      urlHash: string,
      initialIntercepts: (() => Cypress.cy)[]
    ) => {
      // register the API intercepts
      // currently, all pages will show the IP, so an intercept should be registered for every page
      BasePage.apiCallScenarios.getIPSuccess()();
      initialIntercepts.forEach((i) => i());
      cy.visit(urlHash);
    },
  };

  /**
   * The page actions
   */
  static When = {
    /**
     * Open the nav drawer.
     */
    iOpenTheNavDrawer: () => {
      cy.get("[id=appbar-button-nav-open]").click();

      getNavDrawer().contains("Home");
      getNavDrawer().contains("Logs");
      getNavDrawer().contains("Settings");
    },
    /**
     * Click on a nav drawer link that has the specified text.
     * @param text the text to search for.
     */
    iClickOnTheNavLinkWithText: (text: string) => {
      getNavDrawer().contains(text).click();
    },

    /**
     * Click on the app toolbar more menu icon button.
     */
    iClickOnTheAppbarMoreMenu: () => {
      getAppbarMoreMenuIconButton().click();
    },

    /**
     * Select an item in the appbar's more menu.
     * @param itemText the text of the item to select.
     */
    iSelectAppbarMoreMenuItem: (itemText: string) => {
      getAppbarMoreMenu().contains(itemText).click();
    },
  };

  /**
   * The page assertions
   */
  static Then = {
    /**
     * Check to see if the application title is visible.
     */
    iShouldSeeTheApplicationTitle: () => {
      getApplicationTitle().contains("Digital Ocean Dynamic DNS");
    },
    /**
     * The IP address should be visible in the application title in the
     * main appbar.
     * @param ip the ip address.
     */
    iShouldSeeTheIPAddressInTheAppbar: (ip: string) => {
      getApplicationTitle().contains(ip);
    },

    /**
     * Verify that the more menu icon button is visible on the app's toolbar.
     */
    iShouldSeeTheAppbarMoreMenuButton: () => {
      getAppbarMoreMenuIconButton();
    },
  };
}
