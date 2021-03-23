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
  Theme,
  ThemeProvider,
} from "@material-ui/core";
import { deepPurple, indigo } from "@material-ui/core/colors";
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

class DebugRouter extends Router {
  constructor(props) {
    super(props);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log("initial history is: ", JSON.stringify(this.history, null, 2));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.history.listen((location, action) => {
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log(
        `The last navigation action was ${action}`,
        JSON.stringify(this.history, null, 2)
      );
    });
  }
}

export function DODyDnsApp() {
  const classes = useStyles();
  const [isNavDrawerOpen, setIsNavDrawerOpen] = React.useState(false);

  /**
   * Close the nav drawer.
   */
  const toggleDrawer = (): void => {
    setIsNavDrawerOpen(!isNavDrawerOpen);
  };

  return (
    <DebugRouter>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Appbar
            toggleDrawer={toggleDrawer}
            isNavDrawerOpen={isNavDrawerOpen}
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
                <ReactHomeView />
              </Route>
              <Route
                path={"/domain/:domain/subdomains"}
                render={(props) => (
                  <ReactSubdomainsView domain={props.match.params.domain} />
                )}
              />
              <Route path="/about">About</Route>
              <Route path="/logs">
                <ReactLogView />
              </Route>
              <Route path="/settings">
                <ReactSettingsView />
              </Route>
            </Switch>
          </main>
        </div>
      </ThemeProvider>
    </DebugRouter>
  );
}
