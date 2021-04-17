import React, { Component } from "react";

import clsx from "clsx";
import {
  AppBar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import {
  Info as InfoIcon,
  Menu as MenuIcon,
  MoreVert as MoreVertIcon,
  Settings as SettingsIcon,
  Sync as SyncIcon,
} from "@material-ui/icons";

import { DRAWER_WIDTH } from "./NavDrawer.component";
import { Link } from "react-router-dom";
import { AppbarView } from "../view/AppbarView";
import { AppbarPresenter } from "../presenter/AppbarPresenter";

const styles = (theme: Theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  toolbar: {
    // alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
  },
  menuItem: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
});

export interface AppbarProps extends WithStyles<typeof styles> {
  /**
   * True if the nav drawer is open
   */
  isNavDrawerOpen: boolean;

  /**
   * Method to open an error toast.
   * @param error the error message to show.
   */
  showError: (error: string) => void;

  /**
   * Method to toggle the nav drawer.
   */
  toggleDrawer: () => void;
}

interface AppbarState {
  /**
   * The current public-facing IP address.
   */
  ipAddress: string;

  /**
   * The HTML element used to anchor the more menu. In this case,
   * the element is the more icon.
   */
  moreMenuAnchorElement?: HTMLElement;

  /**
   * The view presenter.
   */
  presenter: AppbarPresenter;

  /**
   * Flag for the sync icon visibility
   */
  syncIconVisible: boolean;

  /**
   * The width of the window.
   */
  windowWidth: number;
}

class Appbar extends Component<AppbarProps, AppbarState> implements AppbarView {
  /**
   * Appbar.
   * @param props the AppbarProps.
   */
  constructor(props: AppbarProps) {
    super(props);
    this.state = {
      ipAddress: "Unknown",
      moreMenuAnchorElement: undefined,
      presenter: new AppbarPresenter(this),
      syncIconVisible: false,
      windowWidth: window.innerWidth,
    };
  }

  componentDidMount() {
    this.state.presenter.initializeView();
    window.addEventListener("resize", () =>
      this.setState({ windowWidth: window.innerWidth })
    );
  }

  render() {
    const { classes, isNavDrawerOpen, toggleDrawer } = this.props;
    const isMoreMenuOpen = Boolean(this.state.moreMenuAnchorElement);
    let title = `Digital Ocean Dynamic DNS (IP: ${this.state.ipAddress})`;
    if (this.state.windowWidth <= 400) {
      title = this.state.ipAddress;
    } else if (this.state.windowWidth <= 600) {
      title = `DO-DyDns (IP: ${this.state.ipAddress})`;
    }
    return (
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isNavDrawerOpen,
        })}
      >
        <Toolbar className={classes.toolbar}>
          {/*
            Nav drawer button
          */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            id={"appbar-button-nav-open"}
            onClick={toggleDrawer}
            edge="start"
            className={clsx(
              classes.menuButton,
              isNavDrawerOpen && classes.hide
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.title}
            id={"app-title"}
            variant="h6"
            noWrap
          >
            {title}
          </Typography>

          {/*
            Digital Ocean sync icon
          */}
          {this.state.syncIconVisible && (
            <Tooltip
              title={
                "Synchronize with Digital Ocean. This happens automatically in the background, but you can kick it off here too."
              }
            >
              <IconButton color={"inherit"} onClick={this.syncWithDigitalOcean}>
                <SyncIcon />
              </IconButton>
            </Tooltip>
          )}

          {/*
            More menu button
          */}
          <IconButton
            id={"appbar-iconbutton-more"}
            aria-label="display more actions"
            aria-controls="appbar-menu-more"
            aria-haspopup="true"
            onClick={this._openMoreMenu}
            edge="end"
            color="inherit"
          >
            <MoreVertIcon />
          </IconButton>

          {/*
            More menu
          */}
          <Menu
            id="appbar-menu-more"
            anchorEl={this.state.moreMenuAnchorElement}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted={true}
            open={isMoreMenuOpen}
            onClose={this._closeMoreMenu}
          >
            <Link className={classes.link} to="/about">
              <MenuItem
                className={classes.menuItem}
                onClick={this._closeMoreMenu}
              >
                <ListItemIcon>
                  <InfoIcon color={"inherit"} />
                </ListItemIcon>
                About
              </MenuItem>
            </Link>
            <Divider />
            <Link className={classes.link} to="/settings">
              <MenuItem
                className={classes.menuItem}
                onClick={this._closeMoreMenu}
              >
                <ListItemIcon>
                  <SettingsIcon color={"inherit"} />
                </ListItemIcon>
                Settings
              </MenuItem>
            </Link>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }

  private syncWithDigitalOcean = (): void => {
    const { presenter } = this.state;
    presenter.syncWithDigitalOcean();
  };

  /**
   * Close the more menu
   */
  private _closeMoreMenu = (): void => {
    this.setState({ moreMenuAnchorElement: undefined });
  };

  /**
   * Handle the more menu open request.
   * @param event the react change event.
   */
  private _openMoreMenu = (event: React.MouseEvent<HTMLElement>): void => {
    this.setState({ moreMenuAnchorElement: event.currentTarget });
  };

  /**
   * Display an error message to the user.
   * @param error the error message to display.
   */
  showError(error: string): void {
    this.props.showError(error);
  }

  /**
   * Show the public IP address.
   * @param ipAddress the IP address to show.
   */
  showPublicIPAddress(ipAddress: string): void {
    this.setState({ ipAddress });
  }

  /**
   * Display the Digital Ocean sync icon.
   * @param show true if it should be shows
   */
  showSyncIcon(show: boolean): void {
    this.setState({ syncIconVisible: show });
  }
}

export default withStyles(styles)(Appbar);
