import { LogsPage } from "../support/pages/Logs.po";

describe("System Logs Page", () => {
  it("should display the logs page", () => {
    LogsPage.Given.iNavigateToTheLogsPage([
      LogsPage.apiCallScenarios.initialLoadSuccess(),
    ]);
    LogsPage.Then.iShouldBeOnTheLogsPage();
    LogsPage.Then.iShouldSeeTheLogsLoad();
  });

  it("should display the system logs", () => {
    LogsPage.Given.iNavigateToTheLogsPage([
      LogsPage.apiCallScenarios.initialLoadSuccess(),
    ]);
    LogsPage.Then.iShouldBeOnTheLogsPage();
    LogsPage.Then.iShouldSeeTheLogsLoad();
    LogsPage.Then.iShouldSeeTheseInfoLogs(["DO-DyDns started.."]);
    LogsPage.Then.iShouldSeeTheseDebugLogs([
      "DO-DyDns API listening on '0.0.0.0:3333'",
      "Debug message",
    ]);
    LogsPage.Then.iShouldSeeTheseErrorLogs(["Error message"]);
    LogsPage.Then.iShouldSeeTheseWarningLogs(["Warning message"]);
  });

  it("should display only debug logs when filtered to 'Debug'", () => {
    LogsPage.Given.iNavigateToTheLogsPage([
      LogsPage.apiCallScenarios.initialLoadSuccess(),
    ]);
    LogsPage.Then.iShouldBeOnTheLogsPage();
    LogsPage.Then.iShouldSeeTheLogsLoad();
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
    LogsPage.When.iFilterForOnlyTheseLogs(["Warning"]);
    LogsPage.When.iCloseTheFilterMenu();
    LogsPage.Then.iShouldSeeTheseInfoLogs([]);
    LogsPage.Then.iShouldNotSeeDebugLogs();
    LogsPage.Then.iShouldNotSeeErrorLogs();
    LogsPage.Then.iShouldNotSeeWarningLogs();
  });

  // TODO: combined filtering tests

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
      LogsPage.apiCallScenarios.initialLoadSuccess(),
    ]);
    LogsPage.Then.iShouldBeOnTheLogsPage();
    LogsPage.Then.iShouldSeeTheLogsLoad();
    LogsPage.Then.iShouldSeeTheseInfoLogs(["DO-DyDns started.."]);
    LogsPage.Then.iShouldSeeTheseDebugLogs([
      "DO-DyDns API listening on '0.0.0.0:3333'",
      "Debug message",
    ]);
    LogsPage.Then.iShouldSeeTheseErrorLogs(["Error message"]);
    LogsPage.Then.iShouldSeeTheseWarningLogs(["Warning message"]);
    LogsPage.When.iPressTheRefreshButton();
    LogsPage.Then.iShouldSeeTheLogsRefresh();
    LogsPage.Then.iShouldSeeTheseInfoLogs([
      "DO-DyDns started..",
      "New public-facing IP Address discovered: '1.2.3.4'. Old IP: '4.3.2.1'. Updating Digital Ocean...",
    ]);
    LogsPage.Then.iShouldSeeTheseDebugLogs([
      "DO-DyDns API listening on '0.0.0.0:3333'",
      "Debug message",
    ]);
    LogsPage.Then.iShouldSeeTheseErrorLogs(["Error message"]);
    LogsPage.Then.iShouldSeeTheseWarningLogs(["Warning message"]);
  });
});
