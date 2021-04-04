import React, { ChangeEvent, Component } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  TextField,
  Theme,
  Toolbar,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";

import {
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
} from "@material-ui/icons";

import { SettingsViewPresenter } from "../presenter/SettingsViewPresenter";
import { SettingsView } from "./SettingsView";
import { SettingsResponseEntity } from "../../domain/entity/SettingsResponseEntity";

const styles = (theme: Theme) => ({
  appbar: {
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    zIndex: 0,
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
  input: {
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
  settingsActions: { marginTop: theme.spacing(3) },
  heading: {},
});

export interface ReactSettingsViewProps extends WithStyles<typeof styles> {
  /**
   * Method to open an error toast.
   * @param error the error message to show.
   */
  showError: (error: string) => void;
}

interface ReactSettingsViewState {
  /**
   * The api key value.
   */
  apiKey: string;

  /**
   * The presenter
   */
  presenter: SettingsViewPresenter;

  /**
   * The settings
   */
  settings: SettingsResponseEntity;
}

class ReactSettingsView
  extends Component<ReactSettingsViewProps, ReactSettingsViewState>
  implements SettingsView {
  private static readonly RESET_CONFIRM =
    "Are you sure? This will sign you out of Digital Ocean and remove all local domain/subdomain data.";

  /**
   * SettingsView constructor.
   */
  constructor(props: ReactSettingsViewProps) {
    super(props);
    this.state = {
      apiKey: "",
      presenter: new SettingsViewPresenter(this),
      settings: {
        id: "0",
        apiKeyValid: false,
        digitalOceanUpdateInterval: 15,
        publicIPUpdateInterval: 15,
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
    const apiKeyHidden = this.state.settings.apiKeyValid ? "*".repeat(16) : "";
    return (
      <div>
        {/* Settings Appbar */}
        <AppBar
          id={"settings-toolbar"}
          position="relative"
          className={classes.appbar}
          color="secondary"
        >
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.title}>Settings</Typography>
          </Toolbar>
        </AppBar>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="settings-digitalocean"
            id="settings-header-digitalocean"
          >
            <Typography className={classes.heading}>Digital Ocean</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display={"flex"} flexDirection={"column"} width={1}>
              <Box display={"flex"}>
                <TextField
                  id={"settings-input-apikey"}
                  className={classes.input}
                  placeholder={apiKeyHidden}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                    this.setState({ apiKey: event.target.value });
                  }}
                  label="Digital Ocean API Key"
                  type="password"
                />
                <Button
                  id={"settings-button-apikey-reset"}
                  variant={"text"}
                  color={"primary"}
                  onClick={() => this.props.showError("Not implemented.")}
                >
                  Reset
                </Button>
              </Box>
              <div className={classes.spacer} />
              <TextField
                id={"settings-input-digitalocean-update-interval"}
                className={classes.input}
                type="number"
                value={this.state.settings.digitalOceanUpdateInterval}
                label="Update Interval (in minutes)"
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                  const { settings } = this.state;
                  settings.digitalOceanUpdateInterval = parseInt(
                    event.target.value,
                    10
                  );
                  this.setState({ settings });
                }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>
              Public Facing IP Watcher
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display={"flex"} flexDirection={"column"} width={1}>
              <TextField
                id={"settings-input-interval-ipaddress-update"}
                className={classes.input}
                type="number"
                value={this.state.settings.publicIPUpdateInterval}
                label="Update Interval (in minutes)"
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                  const { settings } = this.state;
                  settings.publicIPUpdateInterval = parseInt(
                    event.target.value,
                    10
                  );
                  this.setState({ settings });
                }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        <Box display={"flex"} className={classes.settingsActions}>
          <div className={classes.expand} />
          <Button
            id={"settings-button-reset"}
            color={"primary"}
            variant={"text"}
            onClick={this.resetSettings}
          >
            Restore Defaults
          </Button>
          <Button
            id={"settings-button-save"}
            startIcon={<SaveIcon />}
            color="primary"
            variant="contained"
            onClick={this.updateSettings}
          >
            Save
          </Button>
        </Box>
      </div>
    );
  }

  /**
   * Show an error.
   * @param error the error message to show.
   */
  showError(error: string): void {
    this.props.showError(error);
  }

  /**
   * Show the settings.
   * @param settings the settings.
   */
  showSettings(settings: SettingsResponseEntity): void {
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
    const { apiKey, presenter, settings } = this.state;
    presenter.updateSettings({
      id: settings.id,
      apiKey,
      digitalOceanUpdateInterval: settings.digitalOceanUpdateInterval,
      publicIPUpdateInterval: settings.publicIPUpdateInterval,
      created: settings.created,
      updated: settings.updated,
    });
  };
}

export default withStyles(styles)(ReactSettingsView);
