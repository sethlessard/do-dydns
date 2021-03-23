import { container } from "tsyringe";

import { Presenter } from "./Presenter";
import { LogView } from "../view/LogView";
import { LogEntity, LogLevel } from "../../domain/entity/LogEntity";
import { GetLogsUseCase } from "../../domain/usecase/logs/GetLogsUseCase";
import { DeleteLogsUseCase } from "../../domain/usecase/logs/DeleteLogsUseCase";

export class LogViewPresenter implements Presenter {
  private static readonly DEFAUlT_FILTERS: LogLevel[] = [
    LogLevel.Error,
    LogLevel.Info,
    LogLevel.Warning,
  ];
  private readonly deleteLogsUseCase: DeleteLogsUseCase;
  private readonly getLogsUseCase: GetLogsUseCase;
  private readonly filters: LogLevel[] = [];
  private logs: LogEntity[] = [];

  /**
   * Create a new LogsPresenter instance.
   * @param view the LogView.
   */
  constructor(private readonly view: LogView) {
    this.deleteLogsUseCase = container.resolve(DeleteLogsUseCase);
    this.getLogsUseCase = container.resolve(GetLogsUseCase);

    // binding
  }

  /**
   * Initialize the LogView.
   */
  initializeView = (): void => {
    // set the default filters
    LogViewPresenter.DEFAUlT_FILTERS.forEach((level) => this.addFilter(level));
    this.refreshLogs();
  };

  /**
   * Add a log level to filter by.
   * @param filter the log level.
   */
  addFilter = (filter: LogLevel): void => {
    if (this.filters.indexOf(filter) === -1) {
      this.filters.push(filter);
    }
    if (filter === LogLevel.Debug) {
      this.view.showFilterByDebug(true);
    } else if (filter === LogLevel.Error) {
      this.view.showFilterByError(true);
    } else if (filter === LogLevel.Info) {
      this.view.showFilterByInfo(true);
    } else if (filter === LogLevel.Warning) {
      this.view.showFilterByWarning(true);
    }
    this.view.showLogs(this.filterLogs());
  };

  /**
   * Clea a log level from the current filters.
   * @param filter the log level.
   */
  clearFilter = (filter: LogLevel): void => {
    const idx = this.filters.indexOf(filter);
    if (idx !== -1) {
      this.filters.splice(idx, 1);
    }
    if (filter === LogLevel.Debug) {
      this.view.showFilterByDebug(false);
    } else if (filter === LogLevel.Error) {
      this.view.showFilterByError(false);
    } else if (filter === LogLevel.Info) {
      this.view.showFilterByInfo(false);
    } else if (filter === LogLevel.Warning) {
      this.view.showFilterByWarning(false);
    }
    this.view.showLogs(this.filterLogs());
  };

  /**
   * Delete the DO-DyDns logs.
   */
  deleteLogs = (): void => {
    this.deleteLogsUseCase
      .execute()
      .then((logs) => {
        this.logs = logs;
      })
      .then(() => this.view.showLogs(this.filterLogs()))
      .catch((error) => this.view.showError(error));
  };

  /**
   * Refresh the DO-DyDns logs.
   * @private
   */
  refreshLogs = (): Promise<void> => {
    return this.getLogsUseCase
      .execute()
      .then((logs) => {
        this.logs = logs;
      })
      .then(() => this.view.showLogs(this.filterLogs()))
      .catch((error) => this.view.showError(error));
  };

  /**
   * Filter the DO-DyDns logs.
   * @private
   */
  private filterLogs(): LogEntity[] {
    let logsToShow = this.logs;
    if (this.filters.length > 0) {
      logsToShow = this.logs.filter(
        (log: LogEntity) => this.filters.indexOf(log.logLevel) !== -1
      );
    }
    return logsToShow;
  }
}
