import { View } from "./View";
import { LogEntity } from "../../domain/entity/LogEntity";

export interface LogView extends View {
  /**
   * Show whether or not we are currently filtering by the "Debug" log level.
   * @param filtering true if filtering by "Debug", false if not.
   */
  showFilterByDebug(filtering: boolean): void;

  /**
   * Show whether or not we are currently filtering by the "Error" log level.
   * @param filtering true if filtering by "Error", false if not.
   */
  showFilterByError(filtering: boolean): void;

  /**
   * Show whether or not we are currently filtering by the "Info" log level.
   * @param filtering true if filtering by "Info", false if not.
   */
  showFilterByInfo(filtering: boolean): void;

  /**
   * Show whether or not we are currently filtering by the "Warning" log level.
   * @param filtering true if filtering by "Warning", false if not.
   */
  showFilterByWarning(filtering: boolean): void;

  /**
   * Show the DO-DyDns system logs.
   * @param logs the logs.
   */
  showLogs(logs: LogEntity[]): void;
}
