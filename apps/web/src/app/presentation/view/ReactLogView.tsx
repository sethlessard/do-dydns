import React, { ChangeEvent, Component } from "react";
import clsx from "clsx";

import {
  AppBar,
  Card,
  Checkbox,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import {
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
} from "@material-ui/icons";
import { lightBlue, red, yellow } from "@material-ui/core/colors";

import { LogEntity, LogLevel } from "../../domain/entity/LogEntity";
import { LogView } from "./LogView";
import { LogViewPresenter } from "../presenter/LogViewPresenter";

const styles = (theme: Theme) => ({
  appbar: {
    borderRadius: "3px",
    marginBottom: theme.spacing(2),
  },
  toolbar: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  logs: {
    padding: theme.spacing(2),
  },
  log: {},
  debugLog: {
    color: lightBlue[500],
  },
  errorLog: {
    color: red[500],
  },
  infoLog: {},
  warningLog: {
    color: yellow[700],
  },
});

interface ReactLogViewState {
  /**
   * True if filtering by "Debug"
   */
  filterByDebug: boolean;

  /**
   * True if filtering by "Error"
   */
  filterByError: boolean;

  /**
   * True if filtering by "Info".
   */
  filterByInfo: boolean;

  /**
   * True if filtering by "Warning".
   */
  filterByWarning: boolean;

  /**
   * The anchor element used by the log filter menu.
   */
  filterMenuAnchorElement?: HTMLElement;

  /**
   * The logs to display.
   */
  logs: LogEntity[];

  /**
   * The LogView presenter.
   */
  presenter: LogViewPresenter;
}

// TODO: presenter
class ReactLogView
  extends Component<WithStyles<typeof styles>, ReactLogViewState>
  implements LogView {
  /**
   * ReactLogView constructor.
   */
  constructor(props: WithStyles<typeof styles>) {
    super(props);
    this.state = {
      filterByDebug: false,
      filterByError: false,
      filterByInfo: false,
      filterByWarning: false,
      filterMenuAnchorElement: undefined,
      logs: [],
      presenter: new LogViewPresenter(this),
    };
  }

  componentDidMount() {
    const { presenter } = this.state;
    presenter.initializeView();
  }

  /**
   * Render the LogView component.
   */
  render() {
    const { classes } = this.props;
    const filterMenuOpen = Boolean(this.state.filterMenuAnchorElement);
    return (
      <div>
        {/* Logs Appbar */}
        <AppBar
          position="relative"
          id={"logs-toolbar"}
          className={classes.appbar}
          color="secondary"
        >
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.title}>System Logs</Typography>
            <IconButton
              id={"logs-button-filtermenu"}
              aria-controls={"logs-menu-filter"}
              color={"inherit"}
              onClick={this.openFilterMenu}
            >
              <FilterIcon />
            </IconButton>
            <Menu
              id={"logs-menu-filter"}
              anchorEl={this.state.filterMenuAnchorElement}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={filterMenuOpen}
              keepMounted={true}
              onClose={this.closeFilterMenu}
            >
              <MenuItem>
                <FormControlLabel
                  control={
                    <Checkbox
                      id={"logs-menu-filter-checkbox-debug"}
                      checked={this.state.filterByDebug}
                      onChange={this.handleFilterByDebugCheckChange}
                      name="debug"
                    />
                  }
                  label="Debug"
                />
              </MenuItem>
              <MenuItem>
                <FormControlLabel
                  control={
                    <Checkbox
                      id={"logs-menu-filter-checkbox-error"}
                      checked={this.state.filterByError}
                      onChange={this.handleFilterByErrorCheckChange}
                      name="error"
                    />
                  }
                  label="Error"
                />
              </MenuItem>
              <MenuItem>
                <FormControlLabel
                  control={
                    <Checkbox
                      id={"logs-menu-filter-checkbox-info"}
                      checked={this.state.filterByInfo}
                      onChange={this.handleFilterByInfoCheckChange}
                      name="info"
                    />
                  }
                  label="Info"
                />
              </MenuItem>
              <MenuItem>
                <FormControlLabel
                  control={
                    <Checkbox
                      id={"logs-menu-filter-checkbox-warning"}
                      checked={this.state.filterByWarning}
                      onChange={this.handleFilterByWarningCheckChange}
                      name="warning"
                    />
                  }
                  label="Warning"
                />
              </MenuItem>
            </Menu>
            <IconButton
              id={"logs-button-refresh"}
              onClick={() => this.state.presenter.refreshLogs()}
              color="inherit"
            >
              <RefreshIcon />
            </IconButton>
            <IconButton
              id={"logs-button-delete"}
              onClick={() => this.state.presenter.deleteLogs()}
              color="inherit"
            >
              <DeleteIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Card id={"logs"} className={classes.logs}>
          {this.state.logs.length > 0 &&
            this.state.logs.map((log) => this.renderLog(log))}
          {this.state.logs.length === 0 && (
            <Typography>It's quiet here...</Typography>
          )}
        </Card>
      </div>
    );
  }

  private renderLog(log: LogEntity) {
    const { classes } = this.props;
    return (
      <Typography
        key={log.id}
        className={clsx(classes.log, {
          [classes.debugLog]: log.logLevel === LogLevel.Debug,
          [classes.errorLog]: log.logLevel === LogLevel.Error,
          [classes.infoLog]: log.logLevel === LogLevel.Info,
          [classes.warningLog]: log.logLevel === LogLevel.Warning,
        })}
        variant={"body2"}
      >
        <strong>{ReactLogView.renderLogDateTime(log.created)}</strong>{" "}
        {log.message}
      </Typography>
    );
  }

  /**
   * Close the filter menu.
   */
  private closeFilterMenu = () => {
    this.setState({ filterMenuAnchorElement: undefined });
  };

  /**
   * Open the filter menu.
   * @param event the mouse event.
   */
  private openFilterMenu = (event: React.MouseEvent<HTMLElement>): void => {
    this.setState({ filterMenuAnchorElement: event.currentTarget });
  };

  /**
   * Handle the check change event on the "Debug" checkbox.
   * @param _ the event.
   * @param checked whether or not the checkbox was checked.
   */
  private handleFilterByDebugCheckChange = (
    _: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    if (checked) {
      this.state.presenter.addFilter(LogLevel.Debug);
    } else {
      this.state.presenter.clearFilter(LogLevel.Debug);
    }
  };

  /**
   * Handle the check change event on the "Error" checkbox.
   * @param _ the event.
   * @param checked whether or not the checkbox was checked.
   */
  private handleFilterByErrorCheckChange = (
    _: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    if (checked) {
      this.state.presenter.addFilter(LogLevel.Error);
    } else {
      this.state.presenter.clearFilter(LogLevel.Error);
    }
  };

  /**
   * Handle the check change event on the "Info" checkbox.
   * @param _ the event.
   * @param checked whether or not the checkbox was checked.
   */
  private handleFilterByInfoCheckChange = (
    _: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    if (checked) {
      this.state.presenter.addFilter(LogLevel.Info);
    } else {
      this.state.presenter.clearFilter(LogLevel.Info);
    }
  };

  /**
   * Handle the check change event on the "Warning" checkbox.
   * @param _ the event.
   * @param checked whether or not the checkbox was checked.
   */
  private handleFilterByWarningCheckChange = (
    _: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    if (checked) {
      this.state.presenter.addFilter(LogLevel.Warning);
    } else {
      this.state.presenter.clearFilter(LogLevel.Warning);
    }
  };

  /**
   * Show an error.
   * @param error the error message to show.
   */
  showError(error: string) {
    //  TODO: toast
    alert(error);
  }

  /**
   * Show whether or not we are currently filtering by the "Debug" log level.
   * @param filtering true if filtering by "Debug", false if not.
   */
  showFilterByDebug(filtering: boolean): void {
    this.setState({ filterByDebug: filtering });
  }

  /**
   * Show whether or not we are currently filtering by the "Error" log level.
   * @param filtering true if filtering by "Error", false if not.
   */
  showFilterByError(filtering: boolean): void {
    this.setState({ filterByError: filtering });
  }

  /**
   * Show whether or not we are currently filtering by the "Info" log level.
   * @param filtering true if filtering by "Info", false if not.
   */
  showFilterByInfo(filtering: boolean): void {
    this.setState({ filterByInfo: filtering });
  }

  /**
   * Show whether or not we are currently filtering by the "Warning" log level.
   * @param filtering true if filtering by "Warning", false if not.
   */
  showFilterByWarning(filtering: boolean): void {
    this.setState({ filterByWarning: filtering });
  }

  /**
   * Show the DO-DyDns system logs.
   * @param logs the logs.
   */
  showLogs(logs: LogEntity[]): void {
    this.setState({ logs });
  }

  /**
   * Render the log date time.
   * @param created when the log was created
   * @private
   */
  private static renderLogDateTime(created: number): string {
    const date = new Date(created);
    return `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`;
  }
}

export default withStyles(styles)(ReactLogView);
