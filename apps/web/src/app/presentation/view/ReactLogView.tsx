import React, { Component } from "react";

import {
  AppBar,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import {
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from "@material-ui/icons";

const styles = (_: Theme) => ({
  appbar: {
    borderRadius: "3px",
  },
  toolbar: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
});

interface ReactLogViewState {
  stuff: string;
}

// TODO: presenter
class ReactLogView extends Component<
  WithStyles<typeof styles>,
  ReactLogViewState
> {
  /**
   * LogView constructor.
   */
  constructor() {
    super(undefined);
    this.state = {
      stuff: "",
    };
  }

  /**
   * Render the LogView component.
   */
  render() {
    const { classes } = this.props;
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
            <IconButton color="inherit">
              <RefreshIcon />
            </IconButton>
            <IconButton color="inherit">
              <DeleteIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(ReactLogView);
