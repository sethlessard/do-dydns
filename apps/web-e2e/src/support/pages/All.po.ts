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

export const All = {
  getApplicationTitle,
  When: {
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
  },
  Then: {
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
  },
};
