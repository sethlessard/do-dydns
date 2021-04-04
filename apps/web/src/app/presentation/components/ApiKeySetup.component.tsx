import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  List,
  ListItem,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
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
        <CardContent>
          <Typography>Prerequisites</Typography>
          <List>
            <ListItem>
              1. Create an account on &nbsp;
              <a href={"https://digitalocean.com"} target={"__blank"}>
                Digital Ocean
              </a>
              .
            </ListItem>
            <ListItem>2. Have a domain.</ListItem>
            <ListItem>
              3.&nbsp;
              <a
                href={
                  "https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars"
                }
                target={"__blank"}
              >
                Register your domain to use Digital Ocean's nameservers.
              </a>
            </ListItem>
            <ListItem>
              4.&nbsp;
              <a
                href={
                  "https://www.digitalocean.com/docs/networking/dns/how-to/add-domains/"
                }
                target={"__blank"}
              >
                Add your domain to your Digital Ocean account.
              </a>
            </ListItem>
            <ListItem>
              5.&nbsp;
              <a
                href={
                  "https://www.digitalocean.com/docs/apis-clis/api/create-personal-access-token/"
                }
                target={"__blank"}
              >
                Create your Digital Ocean API key.
              </a>
            </ListItem>
            <ListItem>
              6.&nbsp;<Link to={"/settings"}>Add</Link>&nbsp;your API key to
              DO-DyDns
            </ListItem>
          </List>
        </CardContent>
        <CardActions>
          <div className={classes.flexGrow} />
          <a
            href={
              "https://www.digitalocean.com/docs/apis-clis/api/create-personal-access-token/"
            }
            target={"__blank"}
          >
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
