import React, { ChangeEvent, Component } from "react";

import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Theme,
  Toolbar,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";

import { Save as SaveIcon } from "@material-ui/icons";

import { SettingsEntity } from "../../domain/entity/SettingsEntity";
import { SettingsViewPresenter } from "../presenter/SettingsViewPresenter";
import { SettingsView } from "./SettingsView";

const styles = (theme: Theme) => ({
  appbar: {
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
  },
  toolbar: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  card: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  apiKey: {
    flexGrow: 1,
  },
  updateInterval: {
    flexGrow: 1,
    marginBottom: theme.spacing(1),
  },
  spacer: {
    height: theme.spacing(3),
  },
  footer: {
    display: "flex",
  },
  expand: {
    flex: 1,
  },
  settings: {
    display: "flex",
    flexDirection: "column",
  },
});

interface ReactSettingsViewState {
  presenter: SettingsViewPresenter;
  settings: SettingsEntity;
}

class ReactSettingsView
  extends Component<WithStyles<typeof styles>, ReactSettingsViewState>
  implements SettingsView {
  private static readonly RESET_CONFIRM =
    "Are you sure? This will sign you out of Digital Ocean and remove all local domain/subdomain data.";

  /**
   * SettingsView constructor.
   */
  constructor(props: WithStyles<typeof styles>) {
    super(props);
    this.state = {
      presenter: new SettingsViewPresenter(this),
      settings: {
        id: "0",
        apiKey: "",
        networkUpdateIntervalMinutes: 15,
        created: Date.now(),
        updated: Date.now(),
      },
    };
  }

  componentDidMount() {
    this.state.presenter.initializeView();
  }

  /**
   * Render the SettingsView component.
   */
  render() {
    const { classes } = this.props;
    let apiKeyHidden = "";
    for (let i = 0; i < this.state.settings.apiKey.length; i++) {
      apiKeyHidden += "*";
    }
    return (
      <div>
        {/* Settings Appbar */}
        <AppBar
          position="relative"
          className={classes.appbar}
          color="secondary"
        >
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.title}>Settings</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.card}>
          <CardContent className={classes.settings}>
            <TextField
              className={classes.apiKey}
              placeholder={apiKeyHidden}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                const { settings } = this.state;
                settings.apiKey = event.target.value;
                this.setState({ settings });
              }}
              label="Digital Ocean API Key"
              type="password"
            />
            <div className={classes.spacer} />
            <TextField
              className={classes.updateInterval}
              type="number"
              placeholder="15"
              defaultValue={this.state.settings.networkUpdateIntervalMinutes}
              label="Public-facing IP Address Update Interval (in minutes)"
            />
            <div className={classes.spacer} />
          </CardContent>
          <CardActions>
            <div className={classes.expand} />
            <Button
              color={"primary"}
              variant={"text"}
              onClick={this.resetSettings}
            >
              Reset
            </Button>
            <Button
              startIcon={<SaveIcon />}
              color="primary"
              variant="contained"
              onClick={this.updateSettings}
            >
              Save
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }

  /**
   * Show an error message.
   * @param error the error message.
   */
  showError(error: string) {
    // TODO: toast or something
    console.error(error);
  }

  /**
   * Show the settings.
   * @param settings the settings.
   */
  showSettings(settings: SettingsEntity): void {
    this.setState({ settings });
  }

  /**
   * Reset the settings back to their defaults.
   */
  private resetSettings = () => {
    const { presenter } = this.state;
    // eslint-disable-next-line no-restricted-globals
    if (confirm(ReactSettingsView.RESET_CONFIRM)) {
      presenter.resetSettings();
    }
  };

  /**
   * Update the settings.
   */
  private updateSettings = () => {
    const { presenter, settings } = this.state;
    presenter.updateSettings(settings);
  };
}

export default withStyles(styles)(ReactSettingsView);
