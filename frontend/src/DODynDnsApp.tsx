import React, { Component, ReactNode, CSSProperties } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./redux/configureStore";
import HomeView from "./view/HomeView";
import LogView from "./view/LogView";
import SettingsView from "./view/SettingsView";

const {
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
} = require("@react-uix/web");

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

export interface DODyDnsAppProps {
  children?: ReactNode[],
  style?: CSSProperties
};

class DODyDnsApp extends Component<DODyDnsAppProps> {

  /**
   * DODyDnsApp constructor.
   * @param props the props.
   */
  constructor(props: DODyDnsAppProps) {
    super(props);
    this.state = {};
  }

  /**
   * Render the DODyDnsApp component.
   */
  render() {
    const { style: compStyle } = this.props;
    const style = {
      DODyDnsApp: {

      }
    };
    Object.assign(style.DODyDnsApp, compStyle);
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
                  <Link to="/logs" style={{ textDecoration: "none" }}>
                    <NavItem>
                      <NavItemIcon>receipt_long</NavItemIcon>
                      <NavItemText>Logs</NavItemText>
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
                  <Route path="/logs"><LogView /></Route>
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

export default DODyDnsApp;
