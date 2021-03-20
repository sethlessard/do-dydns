/**
 * Get the toolbar on the logs page.
 */
const getLogsToolbar = () => cy.get("[id=logs-toolbar]");

/**
 * Get the logs container.
 */
const getLogsContainer = () => cy.get("[id=logs]");

/**
 * Get the delete logs button.
 */
const getDeleteButton = () => cy.get("[id=logs-button-delete]");

/**
 * Get the refresh logs button.
 */
const getRefreshButton = () => cy.get("[id=logs-button-refresh]");

/**
 * Get the filter menu button.
 */
const getFilterMenuButton = () => cy.get("[id=logs-button-filtermenu]");

/**
 * Get the logs menu filter.
 */
const getFilterMenu = () => cy.get("[id=logs-menu-filter]");

/**
 * Get the debug filter menu item.
 */
const getDebugFilterMenuItem = () =>
  getFilterMenu().get("[id=logs-menu-filter-menuitem-debug]");

/**
 * Get the error filter menu item.
 */
const getErrorFilterMenuItem = () =>
  getFilterMenu().get("[id=logs-menu-filter-menuitem-error]");

/**
 * Get the info filter menu item.
 */
const getInfoFilterMenuItem = () =>
  getFilterMenu().get("[id=logs-menu-filter-menuitem-info]");

/**
 * Get the warning filter menu item.
 */
const getWarningFilterMenuItem = () =>
  getFilterMenu().get("[id=logs-menu-filter-menuitem-warning]");

/**
 * Clear all log filters.
 */
const clearAllLogFilters = () => {
  getFilterMenuButton().click();
  getDebugFilterMenuItem().uncheck();
  getErrorFilterMenuItem().uncheck();
  getInfoFilterMenuItem().uncheck();
  getWarningFilterMenuItem().uncheck();
};

export const Logs = {
  apiCalls: {
    // deleteFailure: () => () =>
    //   cy
    //     .intercept(
    //       {
    //         method: "DELETE",
    //         url: "/api/v1/log",
    //       },
    //       { fixture: "./logs/Delete.failure.json" }
    //     )
    //     .as("delete.failure"),
    deleteSuccess: () => () =>
      cy
        .intercept(
          {
            method: "DELETE",
            url: "/api/v1/log",
          },
          { fixture: "./logs/DeleteLogs.success.json" }
        )
        .as("delete.success"),
    getSuccess: () => () =>
      cy
        .intercept(
          { method: "GET", url: "/api/v1/log" },
          { fixture: "./logs/GetLogs.success.json" }
        )
        .as("get.success"),
    refreshSuccess: () => () =>
      cy
        .intercept(
          { method: "GET", url: "/api/v1/log" },
          { fixture: "./logs/RefreshLogs.success.json" }
        )
        .as("refresh.success"),
  },
  Given: {
    /**
     * Navigate to the settings page.
     * @param intercepts the cypress intercept to call before navigating to the page.
     */
    iNavigateToTheLogsPage: (intercepts: typeof Logs.apiCalls[]) => {
      intercepts.forEach((intercept) => intercept());
      cy.visit("/logs");
    },
  },
  When: {
    /**
     * Filter the logs for the specified log levels.
     * @param logLevels the log levels to filter by.
     */
    iFilterForOnlyTheseLogs: (
      logLevels: ("Debug" | "Error" | "Info" | "Warning")[]
    ) => {
      clearAllLogFilters();

      getFilterMenuButton().click();

      logLevels.forEach((level) => {
        switch (level) {
          case "Debug":
            getDebugFilterMenuItem().check();
            break;
          case "Error":
            getErrorFilterMenuItem().check();
            break;
          case "Info":
            getInfoFilterMenuItem().check();
            break;
          case "Warning":
            getWarningFilterMenuItem().check();
            break;
        }

        // TODO: close the filter menu
        //  closeFilterMenu();
      });
    },
    /**
     * Press the delete button.
     */
    iPressTheDeleteButton: () => {
      getDeleteButton().click();
    },

    /**
     * Press the refresh button.
     */
    iPressTheRefreshButton: () => {
      getRefreshButton().click();
    },
  },
  Then: {
    /**
     * Verify the logs page is open.
     */
    iShouldBeOnTheLogsPage: () => {
      getLogsToolbar().contains("System Logs");
      getFilterMenuButton();
      getLogsContainer();
    },

    /**
     * Verify that the api was called and the logs were refreshed.
     */
    iShouldSeeTheLogsRefreshed: () => {
      cy.wait("@refresh.success");
    },

    /**
     * Verify that all logs were deleted.
     */
    iShouldNotSeeAnyLogs: function () {
      cy.wait("@delete.success");

      this.iShouldNotSeeDebugLogs();
      this.iShouldNotSeeErrorLogs();
      this.iShouldNotSeeInfoLogs();
      this.iShouldNotSeeWarningLogs();
    },

    /**
     * Verify that no debug logs are visible.
     */
    iShouldNotSeeDebugLogs: () => {
      expect(() => {
        getLogsContainer().contains("Debug");
      }).to.throw();
    },

    /**
     * Verify that no error logs are visible.
     */
    iShouldNotSeeErrorLogs: () => {
      expect(() => {
        getLogsContainer().contains("Error");
      }).to.throw();
    },

    /**
     * Verify that no info logs are visible.
     */
    iShouldNotSeeInfoLogs: () => {
      expect(() => {
        getLogsContainer().contains("Info");
      }).to.throw();
    },

    /**
     * Verify that no warning logs are visible.
     */
    iShouldNotSeeWarningLogs: () => {
      expect(() => {
        getLogsContainer().contains("Warning");
      }).to.throw();
    },

    /**
     * Verify the specified debug logs are visible.
     * @param debugLogs the debug logs.
     */
    iShouldSeeTheseDebugLogs: (debugLogs: string[]) => {
      debugLogs.forEach((log) => getLogsContainer().contains(log));
    },

    /**
     * Verify the specified error logs are visible.
     * @param errorLogs the error logs.
     */
    iShouldSeeTheseErrorLogs: (errorLogs: string[]) => {
      errorLogs.forEach((log) => getLogsContainer().contains(log));
    },

    /**
     * Verify the specified info logs are visible.
     * @param infoLogs the info logs.
     */
    iShouldSeeTheseInfoLogs: (infoLogs: string[]) => {
      infoLogs.forEach((log) => getLogsContainer().contains(log));
    },

    /**
     * Verify the specified warning logs are visible.
     * @param warningLogs the debug logs.
     */
    iShouldSeeTheseWarningLogs: (warningLogs: string[]) => {
      warningLogs.forEach((log) => getLogsContainer().contains(log));
    },
  },
};
