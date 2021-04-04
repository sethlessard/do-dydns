import React, { Component } from "react";

/* @material-ui/core */
import {
  AppBar,
  createStyles,
  Grid,
  GridSize,
  Theme,
  Toolbar,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";

import { HomeView } from "./HomeView";
import { HomeViewPresenter } from "../presenter/HomeViewPresenter";
import { DomainEntity } from "../../domain/entity/DomainEntity";
import { SubdomainEntity } from "../../domain/entity/SubdomainEntity";
import { Domain } from "../components/Domain.component";
import { ApiKeySetup } from "../components/ApiKeySetup.component";
import { NoDomains } from "../components/NoDomains.component";

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
      zIndex: 0,
    },
    domainsToolbar: {
      display: "flex",
    },
    flexGrow: {
      flexGrow: 1,
    },
  });

export interface ReactHomeViewProps extends WithStyles<typeof styles> {
  /**
   * Method to open an error toast.
   * @param error the error message to show.
   */
  showError: (error: string) => void;
}

enum HomeViewScreen {
  ApiKeySetup,
  Home,
}

interface HomeViewState {
  currentScreen: HomeViewScreen;
  domainsAndSubdomains: {
    domain: DomainEntity;
    subdomains: SubdomainEntity[];
  }[];
  error: string;
  errorToastOpen: boolean;
  presenter: HomeViewPresenter;
  /**
   * The width of the window.
   */
  windowWidth: number;
}

class ReactHomeView
  extends Component<ReactHomeViewProps, HomeViewState>
  implements HomeView {
  constructor(props: ReactHomeViewProps) {
    super(props);
    this.state = {
      currentScreen: HomeViewScreen.ApiKeySetup,
      domainsAndSubdomains: [],
      error: "",
      errorToastOpen: false,
      presenter: new HomeViewPresenter(this),
      windowWidth: window.innerWidth,
    };

    this.showDomainsAndSubdomains = this.showDomainsAndSubdomains.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentDidMount() {
    this.state.presenter.initializeView();
    window.addEventListener("resize", () => {
      this.setState({ windowWidth: window.innerWidth });
    });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.windowWidth !== window.innerWidth) {
      this.setState({ windowWidth: window.innerWidth });
    }
  }

  /**
   * Render the HomeView component.
   */
  render() {
    const { classes } = this.props;
    let xs: GridSize = 4;
    // TODO: move 1024 to a screen size object constant in a separate file.
    if (this.state.windowWidth < 700) {
      xs = 12;
    } else if (this.state.windowWidth <= 1024) {
      xs = 6;
    }
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
          </Toolbar>
        </AppBar>
        <Grid id={"domains"} container spacing={3}>
          {/*
            API Key setup
          */}
          {this.state.currentScreen === HomeViewScreen.ApiKeySetup && (
            <ApiKeySetup />
          )}

          {/*
            No domains view
          */}
          {this.state.currentScreen === HomeViewScreen.Home &&
            this.state.domainsAndSubdomains.length === 0 && (
              <NoDomains xs={xs} />
            )}

          {/*
            domains view
          */}
          {this.state.currentScreen === HomeViewScreen.Home &&
            this.state.domainsAndSubdomains.length > 0 &&
            this.state.domainsAndSubdomains.map(({ domain, subdomains }) => (
              <Domain
                key={"domain-" + domain.id}
                domain={domain}
                showError={this.props.showError}
                subdomains={subdomains}
                xs={xs}
              />
            ))}
        </Grid>
      </div>
    );
  }

  /**
   * Display the Digital Ocean api key setup screen.
   */
  showApiKeySetup(): void {
    this.setState({
      domainsAndSubdomains: [],
      currentScreen: HomeViewScreen.ApiKeySetup,
    });
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
    this.setState({ domainsAndSubdomains, currentScreen: HomeViewScreen.Home });
  }

  /**
   * Display an error message to the user.
   * @param error the error message to display.
   */
  showError(error: string): void {
    this.props.showError(error);
  }
}

export default withStyles(styles, { withTheme: true })(ReactHomeView);
