import React from "react";
import { DomainEntity } from "../../domain/entity/DomainEntity";
import { SubdomainEntity } from "../../domain/entity/SubdomainEntity";
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
  List,
  ListItem,
  ListItemIcon,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  ArrowForward as ArrowForwardIcon,
  CloudDone as CloudDoneIcon,
  CloudOff as CloudOffIcon,
  Info as InfoIcon,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
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

export interface DomainProps {
  domain: DomainEntity;
  subdomains: SubdomainEntity[];
}

const SUBHEADER_DOMAIN_IS_ANCHORED_TO_IP =
  "This domain is anchored to this IP.";
const SUBHEADER_DOMAIN_IS_NOT_ANCHORED_TO_IP =
  "DO-DyDns isn't updating this domain.";
const TOOLTIP_DOMAIN_IS_ANCHORED =
  "DO-DyDns is currently keeping this domain up-do-date with the public-facing IP address of this machine.";
const TOOLTIP_DOMAIN_IS_NOT_ANCHORED =
  "DO-DyDns is not updating this domain. Anchor it below if you'd like DO-DyDns to keep this domain in sync with the public-facing IP address of this machine.";
/**
 * Render a datetime.
 * @param when the datetime in ms since 1970
 */
const renderDateTime = (when: number): string => {
  const date = new Date(when);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};
export function Domain({ domain, subdomains }: DomainProps) {
  const classes = styles();
  const nSubdomains = subdomains.length;
  const numberOfSubdomains = `There ${nSubdomains === 1 ? "is" : "are"} ${
    nSubdomains === 0 ? "no" : ""
  }${nSubdomains > 0 ? nSubdomains : ""} subdomain${
    nSubdomains !== 1 ? "s" : ""
  } attached to ${domain.name}`;
  return (
    <Grid item xs={4} className={classes.wrapper}>
      <Card>
        <CardHeader
          title={domain.name}
          subheader={
            domain.active
              ? SUBHEADER_DOMAIN_IS_ANCHORED_TO_IP
              : SUBHEADER_DOMAIN_IS_NOT_ANCHORED_TO_IP
          }
          avatar={
            domain.active ? (
              <Tooltip title={TOOLTIP_DOMAIN_IS_ANCHORED}>
                <CloudDoneIcon />
              </Tooltip>
            ) : (
              <Tooltip title={TOOLTIP_DOMAIN_IS_NOT_ANCHORED}>
                <CloudOffIcon />
              </Tooltip>
            )
          }
        />
        <CardContent>
          <Typography variant={"body1"}>{numberOfSubdomains}</Typography>
          <List>
            {subdomains.length > 0 &&
              subdomains.map((s) => (
                <ListItem key={s.id + s.fullName}>
                  <ListItemIcon>
                    {s.active ? <CloudDoneIcon /> : <CloudOffIcon />}
                  </ListItemIcon>
                  {s.fullName}
                </ListItem>
              ))}
          </List>
        </CardContent>
        <CardActions>
          <Box flexDirection={"column"}>
            <Typography variant={"body2"} className={classes.dateTime}>
              Discovered: {renderDateTime(domain.created)}
            </Typography>
            <Typography variant={"body2"} className={classes.dateTime}>
              Last Updated: {renderDateTime(domain.updated)}
            </Typography>
          </Box>
          <div className={classes.flexGrow} />
          <Button
            color={"primary"}
            variant={"contained"}
            startIcon={domain.active ? undefined : <AnchorIcon />}
          >
            {domain.active ? "Detach" : "Anchor"}
          </Button>
          <Link to={`/domain/${domain.name}/subdomains`}>
            <IconButton>
              <ArrowForwardIcon color={"primary"} />
            </IconButton>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
}

export function NoDomains() {
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
          <Button color={"secondary"} variant={"outlined"}>
            How to Create an API Key
          </Button>
          <Button variant={"contained"} color={"primary"}>
            Add your API Key
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
