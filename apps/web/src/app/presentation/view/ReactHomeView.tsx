import React, { Component } from "react";

/* @material-ui/core */
import {
  AppBar,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import {
  Add as AddIcon
} from "@material-ui/icons";

import { HomeView } from "./HomeView";
import { HomeViewPresenter } from "../presenter/HomeViewPresenter";
import { DomainEntity } from "../../domain/entity/DomainEntity";

const styles = (theme: Theme) =>
  createStyles({
    domainsHeader: {
      padding: theme.spacing(2)
    },
    ipHeader: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    ipHeaderRoot: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between"
    },
    domainsAppbar: {
      borderRadius: "3px"
    },
    domainsToolbar: {
      display: "flex"
    },
    domainsTitle: {
      flexGrow: 1
    }
  });

interface HomeViewProps {
  classes: {
    domainsHeader: string;
    ipHeader: string;
    ipHeaderRoot: string;
    domainsAppbar: string;
    domainsToolbar: string;
    domainsTitle: string;
  }
}

interface HomeViewState {
  domains: DomainEntity[];
  presenter: HomeViewPresenter;
}

class ReactHomeView extends Component<HomeViewProps, HomeViewState> implements HomeView {

  constructor(props: HomeViewProps) {
    super(props);
    this.state = {
      domains: [],
      presenter: new HomeViewPresenter(this)
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
        <AppBar position="relative" className={classes.domainsAppbar} color="secondary">
          <Toolbar className={classes.domainsToolbar}>
            <Typography className={classes.domainsTitle}>
              Domains
            </Typography>
            <IconButton color="inherit">
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3}>
          {this.state.domains.map(d => (
            <Grid item xs={4} key={d.id}>
              <Card>
                <CardHeader>
                  {d.name}
                </CardHeader>
                <CardContent>
                  Active: {d.active}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  /**
   * Show the domains.
   * @param domains the domains.
   */
  showDomains(domains: DomainEntity[]): void { this.setState({ domains }); }

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
