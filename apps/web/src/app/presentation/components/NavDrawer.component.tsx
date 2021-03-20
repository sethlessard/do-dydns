import React from "react";
import {
  createStyles,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import {
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon,
  Notes as NotesIcon,
  Settings as SettingsIcon,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export interface NavDrawerProps {
  open: boolean;
  toggleDrawer: () => void;
}

export const DRAWER_WIDTH = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    link: {
      textDecoration: "none",
    },
  })
);

/**
 * NavDrawer Component.
 * @param props the NavDrawerProps
 */
export function NavDrawer({ open, toggleDrawer }: NavDrawerProps) {
  const classes = useStyles();
  return (
    <Drawer
      id={"nav-drawer"}
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton id={"nav-drawer-button-close"} onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <Link className={classes.link} to="/">
          <ListItem button key="home">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link className={classes.link} to="/logs">
          <ListItem button key="logs">
            <ListItemIcon>
              <NotesIcon />
            </ListItemIcon>
            <ListItemText primary="Logs" />
          </ListItem>
        </Link>
        <Link className={classes.link} to="/settings">
          <ListItem button key="settings">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}
