import React, { Component } from "react";

import clsx from "clsx";
import {
  AppBar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import { Menu as MenuIcon, MoreVert as MoreVertIcon } from "@material-ui/icons";

import { DRAWER_WIDTH } from "./NavDrawer.component";
import { Link } from "react-router-dom";
import { IPView } from "../view/IPView";
import { IPPresenter } from "../presenter/IPPresenter";

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
  isNavDrawerOpen: boolean;
  toggleDrawer: () => void;
}

interface AppbarState {
  presenter: IPPresenter;
  ipAddress: string;
  moreMenuAnchorElement?: HTMLElement;
}

class Appbar extends Component<AppbarProps, AppbarState> implements IPView {
  /**
   * Appbar.
   * @param props the AppbarProps.
   */
  constructor(props: AppbarProps) {
    super(props);
    this.state = {
      ipAddress: "Unknown",
      moreMenuAnchorElement: undefined,
      presenter: new IPPresenter(this),
    };
  }

  componentDidMount() {
    this.state.presenter.initializeView();
  }

  render() {
    const { classes, isNavDrawerOpen, toggleDrawer } = this.props;
    const isMoreMenuOpen = Boolean(this.state.moreMenuAnchorElement);
    return (
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isNavDrawerOpen,
        })}
      >
        <Toolbar className={classes.toolbar}>
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
            Digital Ocean Dynamic DNS (IP: {this.state.ipAddress})
          </Typography>
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
                About
              </MenuItem>
            </Link>
            <Divider />
            <Link className={classes.link} to="/settings">
              <MenuItem
                className={classes.menuItem}
                onClick={this._closeMoreMenu}
              >
                Settings
              </MenuItem>
            </Link>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }

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
    alert(error);
  }

  /**
   * Show the public IP address.
   * @param ipAddress the IP address to show.
   */
  showPublicIPAddress(ipAddress: string): void {
    this.setState({ ipAddress });
  }
}

export default withStyles(styles)(Appbar);
