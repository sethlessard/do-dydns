import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./redux/configureStore";
import PropTypes from "prop-types";
// import styled from "styled-components";

import {
  App,
  Appbar,
  AppTitleContainer,
  AppTitle,
  AppbarToolbar,
  AppContent,
  DropdownButton,
  DropdownButtonItem,
  DropdownButtonIcon,
  DropdownButtonText,
} from "@react-uix/web";
import HomeView from "./view/HomeView";
import SettingsView from "./view/SettingsView";

// const Wrapper = styled.div``;
const store = configureStore();

const theme = {
  colorPrimary: "#000000",
  colorSecondary: "#000000",
  text: {
    colorOnLight: "#111111",
    colorOnDark: "#ffffff"
  }
};

class DODynDnsApp extends Component {

  /**
   * DODynDnsApp constructor.
   * @param {object} props the props.
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // TODO: load stuffs
  }

  /**
   * Render the DODynDnsApp component.
   */
  render() {
    const { style: compStyle } = this.props;
    const style = {
      dODynDnsApp: {

      }
    };
    Object.assign(style.dODynDnsApp, compStyle);
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router basename={process.env.PUBLIC_URL}>
            <App theme={theme}>
              {/* Appbar */}
              <Appbar>
                <AppTitleContainer>
                  <AppTitle>Digital Ocean Dynamic DNS</AppTitle>
                </AppTitleContainer>
                <AppbarToolbar>
                  <DropdownButton icon="more_vert" color="#fff">
                    <Link to="/settings">
                      <DropdownButtonItem onClick={() => alert("not implemented.")}>
                        <DropdownButtonIcon>settings</DropdownButtonIcon>
                        <DropdownButtonText>Settings</DropdownButtonText>
                      </DropdownButtonItem>
                    </Link>
                  </DropdownButton>
                </AppbarToolbar>
              </Appbar>

              {/* Content */}
              <AppContent>
                <Switch>
                  <Route exact path="/"><HomeView /></Route>
                  <Route path="/settings"><SettingsView /></Route>
                </Switch>
              </AppContent>
            </App>
          </Router>
        </ConnectedRouter>
      </Provider>
    );
  }
}

DODynDnsApp.propTypes = {
  children: PropTypes.node
};

export default DODynDnsApp;
