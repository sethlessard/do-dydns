import React, { Component } from "react";

/* @material-ui/core */
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  IconButton,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import {
  Add as AddIcon,
  ArrowForward as ArrowForwardIcon,
  CloudOff as CloudOffIcon,
  CloudDone as CloudDoneIcon,
  Info as InfoIcon,
} from "@material-ui/icons";

import { HomeView } from "./HomeView";
import { HomeViewPresenter } from "../presenter/HomeViewPresenter";
import { DomainEntity } from "../../domain/entity/DomainEntity";

const styles = (theme: Theme) =>
  createStyles({
    domainsHeader: {
      padding: theme.spacing(2),
    },
    ipHeader: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    ipHeaderRoot: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    },
    domainsAppbar: {
      borderRadius: "3px",
      marginBottom: theme.spacing(2),
    },
    domainsToolbar: {
      display: "flex",
    },
    flexGrow: {
      flexGrow: 1,
    },
  });

interface HomeViewState {
  domains: DomainEntity[];
  presenter: HomeViewPresenter;
}

const SUBHEADER_DOMAIN_IS_ANCHORED_TO_IP =
  "This domain is anchored to this IP.";
const SUBHEADER_DOMAIN_IS_NOT_ANCHORED_TO_IP =
  "DO-DyDns isn't updating this domain.";

const TOOLTIP_DOMAIN_IS_ANCHORED =
  "DO-DyDns is currently keeping this domain up-do-date with the public-facing IP address of this network.";

const TOOLTIP_DOMAIN_IS_NOT_ANCHORED =
  "DO-DyDns is not updating this domain. Activate it below if you you'd like DO-DyDns to keep this domain in sync with the public-facing IP address of this network.";

class ReactHomeView
  extends Component<WithStyles<typeof styles>, HomeViewState>
  implements HomeView {
  constructor(props: WithStyles<typeof styles>) {
    super(props);
    this.state = {
      domains: [],
      presenter: new HomeViewPresenter(this),
    };

    this.showDomains = this.showDomains.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentDidMount() {
    this.state.presenter.initializeView();
  }

  /**
   * Render the HomeView component.
   */
  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* Domains Appbar */}
        <AppBar
          position="relative"
          id={"domains-toolbar"}
          className={classes.domainsAppbar}
          color="secondary"
        >
          <Toolbar className={classes.domainsToolbar}>
            <Typography className={classes.flexGrow}>Domains</Typography>
            <IconButton color="inherit">
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid id={"domains"} container spacing={3}>
          {this.state.domains.length > 0 &&
            this.state.domains.map((d) => (
              <Grid item xs={4} key={d.id}>
                <Card>
                  <CardHeader
                    title={d.name}
                    subheader={
                      d.active
                        ? SUBHEADER_DOMAIN_IS_ANCHORED_TO_IP
                        : SUBHEADER_DOMAIN_IS_NOT_ANCHORED_TO_IP
                    }
                    avatar={
                      d.active ? (
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
                    TODO: List the subdomains and their anchor status via an
                    icon
                  </CardContent>
                  <CardActions>
                    <div className={classes.flexGrow} />
                    <Button color={"primary"}>
                      {d.active ? "Deactivate" : "Activate"}
                    </Button>
                    <IconButton>
                      <ArrowForwardIcon color={"primary"} />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          {this.state.domains.length === 0 && (
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
          )}
        </Grid>
      </div>
    );
  }

  /**
   * Show the domains.
   * @param domains the domains.
   */
  showDomains(domains: DomainEntity[]): void {
    this.setState({ domains });
  }

  /**
   * Display an error message to the user.
   * @param error the error message to display.
   */
  showError(error: string): void {
    // TODO: implement
    alert(error);
  }
}

export default withStyles(styles, { withTheme: true })(ReactHomeView);
