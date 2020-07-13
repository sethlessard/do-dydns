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
  NavContent,
  NavDrawer,
  NavItem,
  NavItemIcon,
  NavItemText,
  AppbarToggleButton,
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
          <Router>
            <App theme={theme}>
              {/* Appbar */}
              <Appbar>
                <AppTitleContainer>
                  <AppbarToggleButton>menu</AppbarToggleButton>
                  <AppTitle>Digital Ocean Dynamic DNS</AppTitle>
                </AppTitleContainer>
                <AppbarToolbar>
                  <DropdownButton icon="more_vert" color="#fff">
                    <Link to="/settings" style={{textDecoration: "none"}}>
                      <DropdownButtonItem>
                        <DropdownButtonIcon>settings</DropdownButtonIcon>
                        <DropdownButtonText>Settings</DropdownButtonText>
                      </DropdownButtonItem>
                    </Link>
                  </DropdownButton>
                </AppbarToolbar>
              </Appbar>

              {/* Nav Drawer */}
              <NavDrawer>
                <NavContent>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <NavItem>
                      <NavItemIcon>home</NavItemIcon>
                      <NavItemText>Home</NavItemText>
                    </NavItem>
                  </Link>
                  <Link to="/settings" style={{ textDecoration: "none" }}>
                    <NavItem>
                      <NavItemIcon>settings</NavItemIcon>
                      <NavItemText>Settings</NavItemText>
                    </NavItem>
                  </Link>
                </NavContent>
              </NavDrawer>

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
