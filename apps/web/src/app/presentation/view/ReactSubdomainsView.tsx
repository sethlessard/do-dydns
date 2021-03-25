import React, { Component } from "react";
import { Link } from "react-router-dom";

import { SubdomainsView } from "./SubdomainsView";
import { SubdomainEntity } from "../../domain/entity/SubdomainEntity";
import {
  AppBar,
  createStyles,
  Grid,
  GridSize,
  IconButton,
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
      zIndex: 0,
    },
    toolbar: {
      display: "flex",
    },
    title: {
      flexGrow: 1,
    },
  });

export interface ReactSubdomainsViewProps extends WithStyles<typeof styles> {
  /**
   * Method to open an error toast.
   * @param error the error message to show.
   */
  showError: (error: string) => void;
}

interface ReactSubdomainsViewState {
  presenter: SubdomainsViewPresenter;
  subdomains: SubdomainEntity[];

  /**
   * The width of the window.
   */
  windowWidth: number;
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
      presenter: new SubdomainsViewPresenter(this),
      subdomains: [],
      windowWidth: window.innerWidth,
    };
    console.log("Created subdomains view ");
  }

  componentDidMount() {
    this.state.presenter.setDomain(this.props.domain);
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
   * Render the ReactSubdomainsView.
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
              <Subdomain
                key={"subdomain-" + s.id}
                showError={this.props.showError}
                subdomain={s}
                xs={xs}
              />
            ))}
          <CreateSubdomain showError={this.props.showError} xs={xs} />
        </Grid>
      </div>
    );
  }

  /**
   * Show an error.
   * @param error the error message to show.
   */
  showError(error: string): void {
    this.props.showError(error);
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
