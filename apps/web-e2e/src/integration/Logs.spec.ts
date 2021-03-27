import { LogsPage } from "../support/pages/Logs.po";

describe("System Logs Page", () => {
  it("should display the logs page", () => {
    LogsPage.Given.iNavigateToTheLogsPage([
      LogsPage.apiCallScenarios.initialLoadSuccess(),
    ]);
    LogsPage.Then.iShouldBeOnTheLogsPage();
    LogsPage.Then.iShouldSeeTheLogsLoad();
  });

  it("should not display the debug logs by default", () => {
    LogsPage.Given.iNavigateToTheLogsPage([
      LogsPage.apiCallScenarios.initialLoadSuccess(),
    ]);
    LogsPage.Then.iShouldBeOnTheLogsPage();
    LogsPage.Then.iShouldSeeTheLogsLoad();
    // by default, debug logs should not be shown
    LogsPage.Then.iShouldNotSeeDebugLogs();
    LogsPage.Then.iShouldSeeTheseInfoLogs(["DO-DyDns started.."]);
    LogsPage.Then.iShouldSeeTheseErrorLogs(["Error message"]);
    LogsPage.Then.iShouldSeeTheseWarningLogs(["Warning message"]);
  });

  it("should display only debug logs when filtered to 'Debug'", () => {
    LogsPage.Given.iNavigateToTheLogsPage([
      LogsPage.apiCallScenarios.initialLoadSuccess(),
    ]);
    LogsPage.Then.iShouldBeOnTheLogsPage();
    LogsPage.Then.iShouldSeeTheLogsLoad();
    LogsPage.When.iOpenTheFilterMenu();
    LogsPage.When.iClearAllLogFilters();
    LogsPage.When.iFilterForOnlyTheseLogs(["Debug"]);
    LogsPage.When.iCloseTheFilterMenu();
    LogsPage.Then.iShouldSeeTheseDebugLogs([
      "DO-DyDns API listening on '0.0.0.0:3333'",
      "Debug message",
    ]);
    LogsPage.Then.iShouldNotSeeInfoLogs();
    LogsPage.Then.iShouldNotSeeErrorLogs();
    LogsPage.Then.iShouldNotSeeWarningLogs();
  });

  it("should display only error logs when filtered to 'Error'", () => {
    LogsPage.Given.iNavigateToTheLogsPage([
      LogsPage.apiCallScenarios.initialLoadSuccess(),
    ]);
    LogsPage.Then.iShouldBeOnTheLogsPage();
    LogsPage.Then.iShouldSeeTheLogsLoad();
    LogsPage.When.iOpenTheFilterMenu();
    LogsPage.When.iClearAllLogFilters();
    LogsPage.When.iFilterForOnlyTheseLogs(["Error"]);
    LogsPage.When.iCloseTheFilterMenu();
    LogsPage.Then.iShouldSeeTheseErrorLogs(["Error message"]);
    LogsPage.Then.iShouldNotSeeInfoLogs();
    LogsPage.Then.iShouldNotSeeDebugLogs();
    LogsPage.Then.iShouldNotSeeWarningLogs();
  });

  it("should display only info logs when filtered to 'Info'", () => {
    LogsPage.Given.iNavigateToTheLogsPage([
      LogsPage.apiCallScenarios.initialLoadSuccess(),
    ]);
    LogsPage.Then.iShouldBeOnTheLogsPage();
    LogsPage.Then.iShouldSeeTheLogsLoad();
    LogsPage.When.iOpenTheFilterMenu();
    LogsPage.When.iClearAllLogFilters();
    LogsPage.When.iFilterForOnlyTheseLogs(["Info"]);
    LogsPage.When.iCloseTheFilterMenu();
    LogsPage.Then.iShouldSeeTheseInfoLogs(["DO-DyDns started.."]);
    LogsPage.Then.iShouldNotSeeDebugLogs();
    LogsPage.Then.iShouldNotSeeErrorLogs();
    LogsPage.Then.iShouldNotSeeWarningLogs();
  });

  it("should display only warning logs when filtered to 'Warning'", () => {
    LogsPage.Given.iNavigateToTheLogsPage([
      LogsPage.apiCallScenarios.initialLoadSuccess(),
    ]);
    LogsPage.Then.iShouldBeOnTheLogsPage();
    LogsPage.Then.iShouldSeeTheLogsLoad();
    LogsPage.When.iOpenTheFilterMenu();
    LogsPage.When.iClearAllLogFilters();
    LogsPage.When.iFilterForOnlyTheseLogs(["Warning"]);
    LogsPage.When.iCloseTheFilterMenu();
    LogsPage.Then.iShouldNotSeeInfoLogs();
    LogsPage.Then.iShouldNotSeeDebugLogs();
    LogsPage.Then.iShouldNotSeeErrorLogs();
    LogsPage.Then.iShouldSeeTheseWarningLogs(["Warning message"]);
  });

  it("should display debug and error logs when filtered to 'Debug', and 'Error'", () => {
    LogsPage.Given.iNavigateToTheLogsPage([
      LogsPage.apiCallScenarios.initialLoadSuccess(),
    ]);
    LogsPage.Then.iShouldBeOnTheLogsPage();
    LogsPage.Then.iShouldSeeTheLogsLoad();
    LogsPage.When.iOpenTheFilterMenu();
    LogsPage.When.iClearAllLogFilters();
    LogsPage.When.iFilterForOnlyTheseLogs(["Debug", "Error"]);
    LogsPage.Then.iShouldNotSeeInfoLogs();
    LogsPage.Then.iShouldNotSeeWarningLogs();
    LogsPage.Then.iShouldSeeTheseDebugLogs([
      "DO-DyDns API listening on '0.0.0.0:3333'",
      "Debug message",
    ]);
    LogsPage.Then.iShouldSeeTheseErrorLogs(["Error message"]);
  });

  it("should display debug, error, and info logs when filtered to 'Debug', 'Error', and 'Info'", () => {
    LogsPage.Given.iNavigateToTheLogsPage([
      LogsPage.apiCallScenarios.initialLoadSuccess(),
    ]);
    LogsPage.Then.iShouldBeOnTheLogsPage();
    LogsPage.Then.iShouldSeeTheLogsLoad();
    LogsPage.When.iOpenTheFilterMenu();
    LogsPage.When.iClearAllLogFilters();
    LogsPage.When.iFilterForOnlyTheseLogs(["Debug", "Error", "Info"]);
    LogsPage.Then.iShouldSeeTheseInfoLogs(["DO-DyDns started.."]);
    LogsPage.Then.iShouldSeeTheseDebugLogs([
      "DO-DyDns API listening on '0.0.0.0:3333'",
      "Debug message",
    ]);
    LogsPage.Then.iShouldSeeTheseErrorLogs(["Error message"]);
    LogsPage.Then.iShouldNotSeeWarningLogs();
  });

  it("should display all logs when filtered to 'Debug', 'Info', 'Error', and 'Warning'", () => {
    LogsPage.Given.iNavigateToTheLogsPage([
      LogsPage.apiCallScenarios.initialLoadSuccess(),
    ]);
    LogsPage.Then.iShouldBeOnTheLogsPage();
    LogsPage.Then.iShouldSeeTheLogsLoad();
    LogsPage.When.iOpenTheFilterMenu();
    LogsPage.When.iClearAllLogFilters();
    LogsPage.When.iFilterForOnlyTheseLogs([
      "Debug",
      "Error",
      "Info",
      "Warning",
    ]);
    LogsPage.Then.iShouldSeeTheseDebugLogs([
      "DO-DyDns API listening on '0.0.0.0:3333'",
      "Debug message",
    ]);
    LogsPage.Then.iShouldSeeTheseInfoLogs(["DO-DyDns started.."]);
    LogsPage.Then.iShouldSeeTheseErrorLogs(["Error message"]);
    LogsPage.Then.iShouldSeeTheseWarningLogs(["Warning message"]);
  });

  it("should display error and info logs when filtered to 'Error', and 'Info'", () => {
    LogsPage.Given.iNavigateToTheLogsPage([
      LogsPage.apiCallScenarios.initialLoadSuccess(),
    ]);
    LogsPage.Then.iShouldBeOnTheLogsPage();
    LogsPage.Then.iShouldSeeTheLogsLoad();
    LogsPage.When.iOpenTheFilterMenu();
    LogsPage.When.iClearAllLogFilters();
    LogsPage.When.iFilterForOnlyTheseLogs(["Error", "Info"]);
    LogsPage.Then.iShouldNotSeeDebugLogs();
    LogsPage.Then.iShouldSeeTheseInfoLogs(["DO-DyDns started.."]);
    LogsPage.Then.iShouldSeeTheseErrorLogs(["Error message"]);
    LogsPage.Then.iShouldNotSeeWarningLogs();
  });

  it("should display error, info, and warning logs when filtered to 'Error', 'Info', and 'Warning'", () => {
    LogsPage.Given.iNavigateToTheLogsPage([
      LogsPage.apiCallScenarios.initialLoadSuccess(),
    ]);
    LogsPage.Then.iShouldBeOnTheLogsPage();
    LogsPage.Then.iShouldSeeTheLogsLoad();
    LogsPage.When.iOpenTheFilterMenu();
    LogsPage.When.iClearAllLogFilters();
    LogsPage.When.iFilterForOnlyTheseLogs(["Error", "Info", "Warning"]);
    LogsPage.Then.iShouldNotSeeDebugLogs();
    LogsPage.Then.iShouldSeeTheseInfoLogs(["DO-DyDns started.."]);
    LogsPage.Then.iShouldSeeTheseErrorLogs(["Error message"]);
    LogsPage.Then.iShouldSeeTheseWarningLogs(["Warning message"]);
  });

  it("should display info, warning, and debug logs when filtered to 'Info', 'Warning', and 'Debug'", () => {
    LogsPage.Given.iNavigateToTheLogsPage([
      LogsPage.apiCallScenarios.initialLoadSuccess(),
    ]);
    LogsPage.Then.iShouldBeOnTheLogsPage();
    LogsPage.Then.iShouldSeeTheLogsLoad();
    LogsPage.When.iOpenTheFilterMenu();
    LogsPage.When.iClearAllLogFilters();
    LogsPage.When.iFilterForOnlyTheseLogs(["Debug", "Info", "Warning"]);
    LogsPage.Then.iShouldSeeTheseDebugLogs([
      "DO-DyDns API listening on '0.0.0.0:3333'",
      "Debug message",
    ]);
    LogsPage.Then.iShouldSeeTheseInfoLogs(["DO-DyDns started.."]);
    LogsPage.Then.iShouldSeeTheseWarningLogs(["Warning message"]);
    LogsPage.Then.iShouldNotSeeErrorLogs();
  });

  it("should clear the system logs", () => {
    LogsPage.Given.iNavigateToTheLogsPage([
      LogsPage.apiCallScenarios.initialLoadSuccess(),
      LogsPage.apiCallScenarios.deleteSuccess(),
    ]);
    LogsPage.Then.iShouldBeOnTheLogsPage();
    LogsPage.Then.iShouldSeeTheLogsLoad();
    LogsPage.When.iPressTheDeleteButton();
    LogsPage.Then.iShouldNotSeeAnyLogs();
  });

  it("should refresh the system logs", () => {
    LogsPage.Given.iNavigateToTheLogsPage([
      LogsPage.apiCallScenarios.initialLoadAndRefreshSuccess(),
    ]);
    LogsPage.Then.iShouldBeOnTheLogsPage();
    LogsPage.Then.iShouldSeeTheLogsLoad();
    LogsPage.Then.iShouldNotSeeDebugLogs();
    LogsPage.Then.iShouldSeeTheseInfoLogs(["DO-DyDns started.."]);
    LogsPage.Then.iShouldSeeTheseErrorLogs(["Error message"]);
    LogsPage.Then.iShouldSeeTheseWarningLogs(["Warning message"]);
    LogsPage.When.iPressTheRefreshButton();
    LogsPage.Then.iShouldSeeTheLogsRefresh();
    LogsPage.Then.iShouldNotSeeDebugLogs();
    LogsPage.Then.iShouldSeeTheseInfoLogs([
      "DO-DyDns started..",
      "New public-facing IP Address discovered: '1.2.3.4'. Old IP: '4.3.2.1'. Updating Digital Ocean...",
    ]);
    LogsPage.Then.iShouldSeeTheseErrorLogs(["Error message"]);
    LogsPage.Then.iShouldSeeTheseWarningLogs(["Warning message"]);
  });
});
