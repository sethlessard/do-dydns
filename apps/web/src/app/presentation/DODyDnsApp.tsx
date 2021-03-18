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
import {
  deepPurple,
  indigo
} from "@material-ui/core/colors";
import clsx from "clsx";

/* relative imports */
import { NavDrawer, DRAWER_WIDTH } from "./components/NavDrawer.component";
import Appbar from "./components/Appbar.component";
import ReactHomeView from "./view/ReactHomeView";
import ReactLogView from "./view/ReactLogView";
import ReactSettingsView from "./view/ReactSettingsView";
// import SettingsView from "./view/SettingsView";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[900]
    },
    secondary: {
      main: indigo[400]
    }
  }
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
      ...theme.mixins.toolbar
    }
  }),
);

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
    <Router>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          {/* TODO: stateful title */}
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
              <Route path="/about">
                About
              </Route>
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
    </Router>
  );
}

// class DODyDnsApp extends Component<DODyDnsAppProps> {

//   /**
//    * DODyDnsApp constructor.
//    * @param props the props.
//    */
//   constructor(props: DODyDnsAppProps) {
//     super(props);
//     this.state = {};
//   }

//   /**
//    * Render the DODyDnsApp component.
//    */
//   render() {
//     const { style: compStyle } = this.props;
//     const style = {
//       DODyDnsApp: {

//       }
//     };
//     Object.assign(style.DODyDnsApp, compStyle);
//     return (
//       <Provider store={store}>
//         <ConnectedRouter history={history}>
//           <Router>
//             <ThemeProvider theme={theme}>
//               <AppBar position="static">
//                 <Toolbar>
//                   <IconButton edge="start" aria-label="menu">
//                     <MenuIcon />
//                   </IconButton>
//                   <Typography variant="h6">
//                     {/* TODO: state.title */}
//                     Home
//                   </Typography>
//                   <IconButton aria-label="more">
//                     <MoreVertIcon />
//                   </IconButton>
//                 </Toolbar>
//               </AppBar>
//             </ThemeProvider>
//             {/* <App theme={theme}> */}
//               {/* Appbar */}
//               {/* <Appbar> */}
//                 {/* <AppTitleContainer> */}
//                   {/* <AppbarToggleButton>menu</AppbarToggleButton> */}
//                   {/* <AppTitle>Digital Ocean Dynamic DNS</AppTitle> */}
//                 {/* </AppTitleContainer> */}
//                 {/* <AppbarToolbar> */}
//                   {/* <DropdownButton icon="more_vert" color="#fff"> */}
//                     {/* <Link to="/settings" style={{textDecoration: "none"}}> */}
//                       {/* <DropdownButtonItem> */}
//                         {/* <DropdownButtonIcon>settings</DropdownButtonIcon> */}
//                         {/* <DropdownButtonText>Settings</DropdownButtonText> */}
//                       {/* </DropdownButtonItem> */}
//                     {/* </Link> */}
//                   {/* </DropdownButton> */}
//                 {/* </AppbarToolbar> */}
//               {/* </Appbar> */}

//               {/* Nav Drawer */}
//               {/* <NavDrawer> */}
//                 {/* <NavContent> */}
//                   {/* <Link to="/" style={{ textDecoration: "none" }}> */}
//                     {/* <NavItem> */}
//                       {/* <NavItemIcon>home</NavItemIcon> */}
//                       {/* <NavItemText>Home</NavItemText> */}
//                     {/* </NavItem> */}
//                   {/* </Link> */}
//                   {/* <Link to="/logs" style={{ textDecoration: "none" }}> */}
//                     {/* <NavItem> */}
//                       {/* <NavItemIcon>receipt_long</NavItemIcon> */}
//                       {/* <NavItemText>Logs</NavItemText> */}
//                     {/* </NavItem> */}
//                   {/* </Link> */}
//                   {/* <Link to="/settings" style={{ textDecoration: "none" }}> */}
//                     {/* <NavItem> */}
//                       {/* <NavItemIcon>settings</NavItemIcon> */}
//                       {/* <NavItemText>Settings</NavItemText> */}
//                     {/* </NavItem> */}
//                   {/* </Link> */}
//                 {/* </NavContent> */}
//               {/* </NavDrawer> */}

//               {/* Content */}
//               {/* <AppContent> */}
//                 {/* <Switch> */}
//                   {/* <Route exact path="/"><HomeView /></Route> */}
//                   {/* <Route path="/logs"><LogView /></Route> */}
//                   {/* <Route path="/settings"><SettingsView /></Route> */}
//                 {/* </Switch> */}
//               {/* </AppContent> */}
//             {/* </App> */}
//           </Router>
//         </ConnectedRouter>
//       </Provider>
//     );
//   }
// }
