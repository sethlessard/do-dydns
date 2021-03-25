import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
} from "react-router-dom";

/* @material-ui */
import {
  createMuiTheme,
  createStyles,
  CssBaseline,
  makeStyles,
  Snackbar,
  Theme,
  ThemeProvider,
} from "@material-ui/core";
import clsx from "clsx";

/* relative imports */
import { NavDrawer, DRAWER_WIDTH } from "./components/NavDrawer.component";
import Appbar from "./components/Appbar.component";
import ReactHomeView from "./view/ReactHomeView";
import ReactLogView from "./view/ReactLogView";
import ReactSettingsView from "./view/ReactSettingsView";
import ReactSubdomainsView from "./view/ReactSubdomainsView";

const theme = createMuiTheme({
  palette: {
    primary: {
      // main: deepPurple[900],
      main: "#0065ff",
    },
    secondary: {
      // main: indigo[400],
      main: "#000000",
    },
  },
});

// styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -DRAWER_WIDTH,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    setBelowAppbar: {
      ...theme.mixins.toolbar,
    },
  })
);

export function DODyDnsApp() {
  const classes = useStyles();
  const [isNavDrawerOpen, setIsNavDrawerOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isErrorToastOpen, setIsErrorToastOpen] = React.useState(false);

  /**
   * Show an error to the user.
   * @param error the error to show.
   */
  const showError = (error: string) => {
    setError(error);
    setIsErrorToastOpen(true);
  };

  /**
   * Close the nav drawer.
   */
  const toggleDrawer = (): void => {
    setIsNavDrawerOpen(!isNavDrawerOpen);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Appbar
            toggleDrawer={toggleDrawer}
            isNavDrawerOpen={isNavDrawerOpen}
            showError={showError}
          />
          <NavDrawer open={isNavDrawerOpen} toggleDrawer={toggleDrawer} />
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: isNavDrawerOpen,
            })}
          >
            <div className={classes.setBelowAppbar} />
            <Switch>
              <Route exact path="/">
                <ReactHomeView showError={showError} />
              </Route>
              <Route
                path={"/domain/:domain/subdomains"}
                render={(props) => (
                  <ReactSubdomainsView
                    domain={props.match.params.domain}
                    showError={showError}
                  />
                )}
              />
              <Route path="/about">About</Route>
              <Route path="/logs">
                <ReactLogView showError={showError} />
              </Route>
              <Route path="/settings">
                <ReactSettingsView showError={showError} />
              </Route>
            </Switch>
          </main>
        </div>
        <Snackbar
          open={isErrorToastOpen}
          autoHideDuration={6000}
          onClose={() => {
            setIsErrorToastOpen(false);
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          message={error}
        />
      </ThemeProvider>
    </Router>
  );
}
