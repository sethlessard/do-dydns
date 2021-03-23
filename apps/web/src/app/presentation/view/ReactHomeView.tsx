import React, { Component } from "react";

/* @material-ui/core */
import {
  AppBar,
  createStyles,
  Grid,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";

import { HomeView } from "./HomeView";
import { HomeViewPresenter } from "../presenter/HomeViewPresenter";
import { DomainEntity } from "../../domain/entity/DomainEntity";
import { SubdomainEntity } from "../../domain/entity/SubdomainEntity";
import { Domain, NoDomains } from "../components/Domain.component";

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
  domainsAndSubdomains: {
    domain: DomainEntity;
    subdomains: SubdomainEntity[];
  }[];
  presenter: HomeViewPresenter;
}

class ReactHomeView
  extends Component<WithStyles<typeof styles>, HomeViewState>
  implements HomeView {
  constructor(props: WithStyles<typeof styles>) {
    super(props);
    this.state = {
      domainsAndSubdomains: [],
      presenter: new HomeViewPresenter(this),
    };

    this.showDomainsAndSubdomains = this.showDomainsAndSubdomains.bind(this);
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
          {this.state.domainsAndSubdomains.length > 0 &&
            this.state.domainsAndSubdomains.map(({ domain, subdomains }) => (
              <Domain
                key={"domain-" + domain.id}
                domain={domain}
                subdomains={subdomains}
              />
            ))}
          {this.state.domainsAndSubdomains.length === 0 && <NoDomains />}
        </Grid>
      </div>
    );
  }

  /**
   * Show the domains & subdomains.
   * @param domainsAndSubdomains.
   */
  showDomainsAndSubdomains(
    domainsAndSubdomains: {
      domain: DomainEntity;
      subdomains: SubdomainEntity[];
    }[]
  ): void {
    this.setState({ domainsAndSubdomains });
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
