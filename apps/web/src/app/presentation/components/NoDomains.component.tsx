import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  GridSize,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Dns as DnsIcon } from "@material-ui/icons";

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

export interface NoDomainsProps {
  xs: GridSize;
}

/**
 * Component that is displayed when the user has no domains registered with Digital Ocean.
 * @constructor
 */
export function NoDomains({ xs }: NoDomainsProps) {
  const classes = styles();
  return (
    <Grid item xs={xs} className={classes.wrapper}>
      <Card>
        <CardHeader
          title={"No Domains"}
          subheader={"Where did all your domains go?"}
          avatar={<DnsIcon />}
        />
        <CardContent>
          <Typography variant={"body1"}>
            {/*TODO: link to Digital Ocean domain setup.*/}
            If you have a domain, make sure to first register it with Digital
            Ocean.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
