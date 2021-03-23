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
import {
  ArrowForward as ArrowForwardIcon,
  CloudDone as CloudDoneIcon,
  CloudOff as CloudOffIcon,
} from "@material-ui/icons";
import { AnchorIcon } from "../icons/AnchorIcon";

const styles = makeStyles((_: Theme) =>
  createStyles({
    flexGrow: {
      flexGrow: 1,
    },
    dateTime: {
      fontSize: ".6rem",
    },
    wrapper: {
      height: "100%",
    },
  })
);

export interface SubdomainProps {
  subdomain: SubdomainEntity;
}

const SUBHEADER_SUBDOMAIN_IS_ANCHORED_TO_IP =
  "This subdomain is anchored to this IP.";
const SUBHEADER_SUBDOMAIN_IS_NOT_ANCHORED_TO_IP =
  "DO-DyDns isn't updating this subdomain.";
const TOOLTIP_SUBDOMAIN_IS_ANCHORED =
  "DO-DyDns is currently keeping this subdomain up-do-date with the public-facing IP address of this machine.";
const TOOLTIP_SUBDOMAIN_IS_NOT_ANCHORED =
  "DO-DyDns is not updating this subdomain. Activate it below if you'd like DO-DyDns to keep this subdomain in sync with the public-facing IP address of this machine.";

/**
 * Render a datetime.
 * @param when the datetime in ms since 1970
 */
const renderDateTime = (when: number): string => {
  const date = new Date(when);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export function Subdomain({ subdomain }: SubdomainProps) {
  const classes = styles();
  return (
    <Grid item xs={4} className={classes.wrapper}>
      <Box height={1}>
        <Card>
          <CardHeader
            title={subdomain.fullName}
            subheader={
              subdomain.active
                ? SUBHEADER_SUBDOMAIN_IS_ANCHORED_TO_IP
                : SUBHEADER_SUBDOMAIN_IS_NOT_ANCHORED_TO_IP
            }
            avatar={
              subdomain.active ? (
                <Tooltip title={TOOLTIP_SUBDOMAIN_IS_ANCHORED}>
                  <CloudDoneIcon />
                </Tooltip>
              ) : (
                <Tooltip title={TOOLTIP_SUBDOMAIN_IS_NOT_ANCHORED}>
                  <CloudOffIcon />
                </Tooltip>
              )
            }
          />
          <CardContent />
          <CardActions>
            <Box flexDirection={"column"}>
              <Typography variant={"body2"} className={classes.dateTime}>
                Discovered: {renderDateTime(subdomain.created)}
              </Typography>
              <Typography variant={"body2"} className={classes.dateTime}>
                Last Updated: {renderDateTime(subdomain.updated)}
              </Typography>
            </Box>
            <div className={classes.flexGrow} />
            <Button
              color={"primary"}
              variant={"contained"}
              startIcon={subdomain.active ? undefined : <AnchorIcon />}
            >
              {subdomain.active ? "Detach" : "Anchor"}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
}
