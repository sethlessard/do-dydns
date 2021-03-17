import React from "react";

import clsx from "clsx";
import {
  AppBar,
  createStyles,
  Divider,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Typography
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  MoreVert as MoreVertIcon
} from "@material-ui/icons";

import { DRAWER_WIDTH } from "./NavDrawer.component";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    toolbar: {
      // alignItems: "flex-start",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    title: {
      flexGrow: 1
    },
    link: {
      textDecoration: "none"
    },
    menuItem: {
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  })
);

export interface AppbarProps {
  isNavDrawerOpen: boolean;
  title: string;
  toggleDrawer: () => void;
}

export function Appbar({ isNavDrawerOpen, title, toggleDrawer }: AppbarProps) {
  const classes = useStyles();
  const [moreMenuAnchorElement, setMoreMenuAnchorElement] = React.useState<HTMLElement | undefined>(undefined);
  const isMoreMenuOpen = Boolean(moreMenuAnchorElement);

  /**
   * Close the more menu
   */
  const closeMoreMenu = (): void => {
    setMoreMenuAnchorElement(undefined);
  };

  /**
   * Handle the more menu open request.
   * @param event the react change event.
   */
  const openMoreMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setMoreMenuAnchorElement(event.currentTarget);
  };
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
          onClick={toggleDrawer}
          edge="start"
          className={clsx(classes.menuButton, isNavDrawerOpen && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        < Typography
          className={classes.title}
          variant="h6"
          noWrap
        >
          {title}
        </Typography>
        <IconButton
          aria-label="display more actions"
          aria-controls="appbar-menu-more"
          aria-haspopup="true"
          onClick={openMoreMenu}
          edge="end"
          color="inherit"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="appbar-menu-more"
          anchorEl={moreMenuAnchorElement}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          keepMounted={true}
          open={isMoreMenuOpen}
          onClose={closeMoreMenu}
        >
          <Link className={classes.link} to="/about">
            <MenuItem
              className={classes.menuItem}
              onClick={closeMoreMenu}
            >
              About
            </MenuItem>
          </Link>
          <Divider />
          <Link className={classes.link} to="/settings">
            <MenuItem
              className={classes.menuItem}
              onClick={closeMoreMenu}
            >
              Settings
            </MenuItem>
          </Link>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
