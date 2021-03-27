import { BasePage } from "./Base.po";
import cy = Cypress.cy;
import { lightBlue, red, yellow } from "@material-ui/core/colors";

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
  getFilterMenu().get("[id=logs-menu-filter-checkbox-debug]");

/**
 * Get the error filter menu item.
 */
const getErrorFilterMenuItem = () =>
  getFilterMenu().get("[id=logs-menu-filter-checkbox-error]");

/**
 * Get the info filter menu item.
 */
const getInfoFilterMenuItem = () =>
  getFilterMenu().get("[id=logs-menu-filter-checkbox-info]");

/**
 * Get the warning filter menu item.
 */
const getWarningFilterMenuItem = () =>
  getFilterMenu().get("[id=logs-menu-filter-checkbox-warning]");

/**
 * Clear all log filters.
 */
const clearAllLogFilters = () => {
  getDebugFilterMenuItem().uncheck();
  getErrorFilterMenuItem().uncheck();
  getInfoFilterMenuItem().uncheck();
  getWarningFilterMenuItem().uncheck();
};

export class LogsPage {
  static apiCallScenarios = Object.assign(BasePage.apiCallScenarios, {
    // TODO: deleteFailure
    // TODO: initialLoadFailure
    // TODO: initialLoadThenRefreshFailure
    deleteSuccess: () => () =>
      cy
        .intercept(
          {
            method: "DELETE",
            url: "/api/v1/log",
          },
          { fixture: "logs/DeleteLogs.success.json" }
        )
        .as("logs.delete.success"),
    initialLoadSuccess: () => () =>
      cy
        .intercept(
          { method: "GET", url: "/api/v1/log" },
          { fixture: "logs/GetLogs.success.json" }
        )
        .as("logs.get.success"),
    initialLoadAndRefreshSuccess: () => () => {
      let count = 0;
      return cy
        .intercept({ method: "GET", url: "/api/v1/log" }, (req) => {
          if (count === 0) {
            req.reply({ fixture: "logs/GetLogs.success.json" });
          } else {
            req.reply({ fixture: "logs/RefreshLogs.success.json" });
          }
          count++;
        })
        .as("logs.get.success");
    },
  });

  static Given = Object.assign(BasePage.Given, {
    /**
     * Navigate to the settings page.
     * @param initialIntercepts the API intercepts to use.
     */
    iNavigateToTheLogsPage: function (initialIntercepts: (() => Cypress.cy)[]) {
      this.iNavigateToPageWithUrlHashAndUseIntercepts(
        "/logs",
        initialIntercepts
      );
    },
  });

  static When = Object.assign(BasePage.When, {
    /**
     * Clear all log filters.
     */
    iClearAllLogFilters: () => {
      clearAllLogFilters();
    },

    /**
     * Close the filter menu.
     */
    iCloseTheFilterMenu: () => {
      cy.get("body").click(0, 0);
    },

    /**
     * Open the logs filter menu.
     */
    iOpenTheFilterMenu: () => {
      getFilterMenuButton().click();
    },

    /**
     * Filter the logs for the specified log levels.
     * @param logLevels the log levels to filter by.
     */
    iFilterForOnlyTheseLogs: (
      logLevels: ("Debug" | "Error" | "Info" | "Warning")[]
    ) => {
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
  });

  static Then = Object.assign(BasePage.Then, {
    /**
     * Verify the logs page is open.
     */
    iShouldBeOnTheLogsPage: () => {
      getLogsToolbar().contains("System Logs");
      getFilterMenuButton();
      getLogsContainer();
    },

    /**
     * Verify that the logs are loaded and displayed.
     */
    iShouldSeeTheLogsLoad: () => {
      cy.wait("@logs.get.success");
    },

    /**
     * Verify that the api was called and the logs were refreshed.
     */
    iShouldSeeTheLogsRefresh: () => {
      cy.wait("@logs.get.success");
    },

    /**
     * Verify that all logs were deleted.
     */
    iShouldNotSeeAnyLogs: function () {
      cy.wait("@logs.delete.success");

      this.iShouldNotSeeDebugLogs();
      this.iShouldNotSeeErrorLogs();
      this.iShouldNotSeeInfoLogs();
      this.iShouldNotSeeWarningLogs();
    },

    /**
     * Verify that no debug logs are visible.
     */
    iShouldNotSeeDebugLogs: () => {
      getLogsContainer().contains("Debug").should("not.exist");
    },

    /**
     * Verify that no error logs are visible.
     */
    iShouldNotSeeErrorLogs: () => {
      getLogsContainer().contains("Error").should("not.exist");
    },

    /**
     * Verify that no info logs are visible.
     */
    iShouldNotSeeInfoLogs: () => {
      getLogsContainer().contains("Info").should("not.exist");
    },

    /**
     * Verify that no warning logs are visible.
     */
    iShouldNotSeeWarningLogs: () => {
      getLogsContainer().contains("Warning").should("not.exist");
    },

    /**
     * Verify the specified debug logs are visible.
     * @param debugLogs the debug logs.
     */
    iShouldSeeTheseDebugLogs: (debugLogs: string[]) => {
      debugLogs.forEach((log) =>
        getLogsContainer().contains(log).should("have.color", lightBlue[500])
      );
    },

    /**
     * Verify the specified error logs are visible.
     * @param errorLogs the error logs.
     */
    iShouldSeeTheseErrorLogs: (errorLogs: string[]) => {
      errorLogs.forEach((log) =>
        getLogsContainer().contains(log).should("have.color", red[500])
      );
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
      warningLogs.forEach((log) =>
        getLogsContainer().contains(log).should("have.color", yellow[700])
      );
    },
  });
}
