import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  GridSize,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
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

export interface CreateSubdomainProps {
  /**
   * Method to show an error message to the user.
   * @param error the error to show,
   */
  showError: (error: string) => void;

  /**
   * The number of columns to span
   */
  xs: GridSize;
}

export function CreateSubdomain({ showError, xs }: CreateSubdomainProps) {
  const classes = styles();
  return (
    <Grid item xs={xs} className={classes.wrapper}>
      <Card>
        <CardHeader
          title={"Create a new Subdomain"}
          subheader={
            "DO-DyDns will keep the subdomain anchored to the public-facing IP of this machine."
          }
          avatar={<DnsIcon />}
        />
        <CardContent>
          <Box display={"flex"} justifyContent={"center"}>
            <IconButton onClick={() => showError("Not implemented.")}>
              <AddIcon className={classes.addIcon} color={"primary"} />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
