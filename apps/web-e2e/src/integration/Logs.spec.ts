import { Logs } from "../support/pages/Logs.po";

describe("System Logs Page", () => {
  it("should display the logs page", () => {
    Logs.Given.iNavigateToTheLogsPage([Logs.apiCalls.getSuccess()]);
    Logs.Then.iShouldBeOnTheLogsPage();
  });

  it("should display the system logs", () => {
    Logs.Given.iNavigateToTheLogsPage([Logs.apiCalls.getSuccess()]);
    Logs.Then.iShouldBeOnTheLogsPage();
    Logs.Then.iShouldSeeTheseInfoLogs(["DO-DyDns started.."]);
    Logs.Then.iShouldSeeTheseDebugLogs([
      "DO-DyDns API listening on '0.0.0.0:3333'",
      "Debug message",
    ]);
    Logs.Then.iShouldSeeTheseErrorLogs(["Error message"]);
    Logs.Then.iShouldSeeTheseWarningLogs(["Warning message"]);
  });

  it("should display only debug logs when filtered to 'Debug'", () => {
    Logs.Given.iNavigateToTheLogsPage([Logs.apiCalls.getSuccess()]);
    Logs.Then.iShouldBeOnTheLogsPage();
    Logs.When.iFilterForOnlyTheseLogs(["Debug"]);
    Logs.Then.iShouldSeeTheseDebugLogs([
      "DO-DyDns API listening on '0.0.0.0:3333'",
      "Debug message",
    ]);
    Logs.Then.iShouldNotSeeInfoLogs();
    Logs.Then.iShouldNotSeeErrorLogs();
    Logs.Then.iShouldNotSeeWarningLogs();
  });

  it("should display only error logs when filtered to 'Error'", () => {
    Logs.Given.iNavigateToTheLogsPage([Logs.apiCalls.getSuccess()]);
    Logs.Then.iShouldBeOnTheLogsPage();
    Logs.When.iFilterForOnlyTheseLogs(["Error"]);
    Logs.Then.iShouldSeeTheseErrorLogs(["Error message"]);
    Logs.Then.iShouldNotSeeInfoLogs();
    Logs.Then.iShouldNotSeeDebugLogs();
    Logs.Then.iShouldNotSeeWarningLogs();
  });

  it("should display only info logs when filtered to 'Info'", () => {
    Logs.Given.iNavigateToTheLogsPage([Logs.apiCalls.getSuccess()]);
    Logs.Then.iShouldBeOnTheLogsPage();
    Logs.When.iFilterForOnlyTheseLogs(["Info"]);
    Logs.Then.iShouldSeeTheseInfoLogs(["DO-DyDns started.."]);
    Logs.Then.iShouldNotSeeDebugLogs();
    Logs.Then.iShouldNotSeeErrorLogs();
    Logs.Then.iShouldNotSeeWarningLogs();
  });

  it("should display only warning logs when filtered to 'Warning'", () => {
    Logs.Given.iNavigateToTheLogsPage([Logs.apiCalls.getSuccess()]);
    Logs.Then.iShouldBeOnTheLogsPage();
    Logs.When.iFilterForOnlyTheseLogs(["Warning"]);
    Logs.Then.iShouldSeeTheseInfoLogs([]);
    Logs.Then.iShouldNotSeeDebugLogs();
    Logs.Then.iShouldNotSeeErrorLogs();
    Logs.Then.iShouldNotSeeWarningLogs();
  });

  // TODO: combined filtering tests

  it("should clear the system logs", () => {
    Logs.Given.iNavigateToTheLogsPage([
      Logs.apiCalls.getSuccess(),
      Logs.apiCalls.deleteSuccess(),
    ]);
    Logs.Then.iShouldBeOnTheLogsPage();
    Logs.When.iPressTheDeleteButton();
    Logs.Then.iShouldNotSeeAnyLogs();
  });

  it("should refresh the system logs", () => {
    Logs.Given.iNavigateToTheLogsPage([
      Logs.apiCalls.getSuccess(),
      Logs.apiCalls.refreshSuccess(),
    ]);
    Logs.Then.iShouldBeOnTheLogsPage();
    Logs.Then.iShouldSeeTheseInfoLogs(["DO-DyDns started.."]);
    Logs.Then.iShouldSeeTheseDebugLogs([
      "DO-DyDns API listening on '0.0.0.0:3333'",
      "Debug message",
    ]);
    Logs.Then.iShouldSeeTheseErrorLogs(["Error message"]);
    Logs.Then.iShouldSeeTheseWarningLogs(["Warning message"]);
    Logs.When.iPressTheRefreshButton();
    Logs.Then.iShouldSeeTheLogsRefreshed();
    Logs.Then.iShouldSeeTheseInfoLogs([
      "DO-DyDns started..",
      "New public-facing IP Address discovered: '1.2.3.4'. Old IP: '4.3.2.1'. Updating Digital Ocean...",
    ]);
    Logs.Then.iShouldSeeTheseDebugLogs([
      "DO-DyDns API listening on '0.0.0.0:3333'",
      "Debug message",
    ]);
    Logs.Then.iShouldSeeTheseErrorLogs(["Error message"]);
    Logs.Then.iShouldSeeTheseWarningLogs(["Warning message"]);
  });
});
