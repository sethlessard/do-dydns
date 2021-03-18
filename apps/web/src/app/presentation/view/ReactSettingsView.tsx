import React, { Component } from "react";

import {
  Card,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { SettingsEntity } from "../../domain/entity/SettingsEntity";
import { Presenter } from "../presenter/Presenter";
import { SettingsViewPresenter } from "../presenter/SettingsViewPresenter";
import { SettingsView } from "./SettingsView";

const styles = (theme: Theme) => ({

});

interface ReactSettingsViewState {
  presenter: Presenter;
  settings: SettingsEntity;
}

class ReactSettingsView extends Component<WithStyles<typeof styles>, ReactSettingsViewState> implements SettingsView {

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
        updated: Date.now()
      }
    };
  }

  componentDidMount() {
    this.state.presenter.initializeView();
  }

  /**
   * Render the SettingsView component.
   */
  render() {
    return (
      <div>
        <Card>
          
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
    alert(error);
  }

  /**
   * Show the settings.
   * @param settings the settings.
   */
  showSettings(settings: SettingsEntity): void {
    this.setState({ settings });
  }
}

export default withStyles(styles)(ReactSettingsView);
