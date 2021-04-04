import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Tooltip,
} from "@material-ui/core";
import { Info as InfoIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React from "react";

const styles = makeStyles((_: Theme) =>
  createStyles({
    flexGrow: {
      flexGrow: 1,
    },
  })
);

/**
 * Api key setup component. Displays the necessary information on how to configure
 * the Digital Ocean API key.
 * @constructor
 */
export function ApiKeySetup() {
  const classes = styles();
  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader
          title={"Get started with Digital Ocean & Dynamic DNS"}
          avatar={
            <Tooltip title={"TODO: tooltip"}>
              <InfoIcon />
            </Tooltip>
          }
        />
        <CardContent>TODO: List the steps to get started</CardContent>
        <CardActions>
          <div className={classes.flexGrow} />
          <a
            href={
              "https://www.digitalocean.com/docs/apis-clis/api/create-personal-access-token/"
            }
            target={"__blank"}
          >
            {" "}
            <Button color={"secondary"} variant={"outlined"}>
              How to Create an API Key
            </Button>
          </a>
          <Link to={"/settings"}>
            <Button variant={"contained"} color={"primary"}>
              Set your API Key
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
}
