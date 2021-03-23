import React, { Component } from "react";
import { Link } from "react-router-dom";

import { SubdomainsView } from "./SubdomainsView";
import { SubdomainEntity } from "../../domain/entity/SubdomainEntity";
import {
  AppBar,
  Card,
  createStyles,
  Grid,
  IconButton,
  Snackbar,
  Theme,
  Toolbar,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { SubdomainsViewPresenter } from "../presenter/SubdomainsViewPresenter";
import { Subdomain } from "../components/Subdomain.component";
import { CreateSubdomain } from "../components/CreateSubdomain.component";

const styles = (theme: Theme) =>
  createStyles({
    appbar: {
      borderRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing(2),
    },
    toolbar: {
      display: "flex",
    },
    title: {
      flexGrow: 1,
    },
  });

interface ReactSubdomainsViewState {
  /**
   * The current error.
   */
  error: string;

  /**
   * true if the error toast is open.
   */
  errorToastOpen: boolean;
  presenter: SubdomainsViewPresenter;
  subdomains: SubdomainEntity[];
}

export interface ReactSubdomainsViewProps extends WithStyles<typeof styles> {
  /**
   * The name of the domain.
   */
  domain: string;
}

class ReactSubdomainsView
  extends Component<ReactSubdomainsViewProps, ReactSubdomainsViewState>
  implements SubdomainsView {
  constructor(props: ReactSubdomainsViewProps) {
    super(props);
    this.state = {
      error: "",
      errorToastOpen: false,
      presenter: new SubdomainsViewPresenter(this),
      subdomains: [],
    };
    console.log("Created subdomains view ");
  }

  componentDidMount() {
    this.state.presenter.setDomain(this.props.domain);
    this.state.presenter.initializeView();
  }

  /**
   * Render the ReactSubdomainsView.
   */
  render() {
    const { classes } = this.props;

    return (
      <div>
        {/* Subdomains Appbar */}
        <AppBar
          id={"subdomains-toolbar"}
          position="relative"
          className={classes.appbar}
          color="secondary"
        >
          <Toolbar className={classes.toolbar}>
            <Link to={"/"}>
              <IconButton>
                <ArrowBackIcon color={"primary"} />
              </IconButton>
            </Link>
            <Typography className={classes.title}>Subdomains</Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3}>
          {this.state.subdomains.length > 0 &&
            this.state.subdomains.map((s) => (
              <Subdomain key={"subdomain-" + s.id} subdomain={s} />
            ))}
          <CreateSubdomain />
        </Grid>
        <Snackbar
          open={this.state.errorToastOpen}
          autoHideDuration={6000}
          onClose={() => {
            this.setState({ errorToastOpen: false });
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          message={this.state.error}
        />
      </div>
    );
  }

  /**
   * Show an error.
   * @param error the error message to show.
   */
  showError(error: string): void {
    this.setState({ error, errorToastOpen: true });
  }

  /**
   * Display the subdomains.
   * @param subdomains the subdomains.
   */
  showSubdomains(subdomains: SubdomainEntity[]): void {
    this.setState({ subdomains });
  }
}

export default withStyles(styles)(ReactSubdomainsView);
