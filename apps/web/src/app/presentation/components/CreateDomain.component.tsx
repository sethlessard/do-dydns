import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { SubdomainEntity } from "../../domain/entity/SubdomainEntity";
import { Add as AddIcon, Dns as DnsIcon } from "@material-ui/icons";

const styles = makeStyles((_: Theme) =>
  createStyles({
    flexGrow: {
      flexGrow: 1,
    },
    dateTime: {
      fontSize: ".6rem",
    },
    addIcon: {
      fontSize: "3rem",
    },
    wrapper: {
      height: "100%",
    },
  })
);

export interface SubdomainProps {
  subdomain: SubdomainEntity;
}

export function CreateDomain() {
  const classes = styles();
  return (
    <Grid item xs={4} className={classes.wrapper}>
      <Card>
        <CardHeader
          title={"Add a new Domain"}
          subheader={
            "DO-DyDns will keep the domain and any selected subdomains anchored to the public-facing IP of this machine."
          }
          avatar={<DnsIcon />}
        />
        <CardContent>
          <Box display={"flex"} justifyContent={"center"}>
            <IconButton>
              <AddIcon className={classes.addIcon} color={"primary"} />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
