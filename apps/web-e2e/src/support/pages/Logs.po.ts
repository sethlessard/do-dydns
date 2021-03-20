/**
 * Get the toolbar on the logs page.
 */
const getLogsToolbar = () => cy.get("[id=logs-toolbar]");

export const Logs = {
  Given: {},
  When: {},
  Then: {
    /**
     * Verify the logs page is open.
     */
    iShouldBeOnTheLogsPage: () => {
      getLogsToolbar().contains("System Logs");
    },
  },
};
