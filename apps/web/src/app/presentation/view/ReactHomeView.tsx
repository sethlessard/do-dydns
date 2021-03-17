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
  TextField,
  Theme,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import {
  Add as AddIcon
} from "@material-ui/icons";

import { HomeView } from "./HomeView";
import { DomainModel } from "../model/DomainModel";
import { HomeViewPresenter } from "../presenter/HomeViewPresenter";

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
  domains: DomainModel[];
  publicIPAddress: string;
  presenter: HomeViewPresenter;
}

class ReactHomeView extends Component<HomeViewProps, HomeViewState> implements HomeView {

  constructor(props: HomeViewProps) {
    super(props);
    this.state = {
      domains: [],
      publicIPAddress: "Unknown",
      presenter: new HomeViewPresenter(this)
    };
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card variant="outlined" className={classes.ipHeader}>
              <div className={classes.ipHeaderRoot}>
                <Typography>Public-Facing IP Address:</Typography>
                <TextField
                  defaultValue={this.state.publicIPAddress}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
            </Card>
          </Grid>
        </Grid>

        {/* Domains Appbar */}
        <AppBar position="relative" className={classes.domainsAppbar}>
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

      // <Wrapper style={style.homeView}>
      //   <Page>
      //     <Row>
      //       <Card z={2}>
      //         <CardHeader>
      //           <Heading h={6}>Status</Heading>
      //         </CardHeader>
      //         <CardBody>
      //           <Grid columns={2}>
      //             <Text style={{ fontWeight: "bold" }}>Current IP Address:</Text>
      //             <Text>{ip}</Text>
      //           </Grid>
      //         </CardBody>
      //         {/* <CardFooter></CardFooter> */}
      //       </Card>
      //     </Row>

      //     <Spacer horizontal={true} />

      //     <Row>
      //       <Toolbar>
      //         <ToolbarTitle>Domains</ToolbarTitle>
      //       </Toolbar>
      //     </Row>
      //     <Row>
      //       <Card>
      //         <CardBody>
      //           <Table>
      //             <TableHeader>
      //               <TableRow>
      //                 <HeaderCell>Domain</HeaderCell>
      //                 <HeaderCell>TTL (Seconds)</HeaderCell>
      //                 <HeaderCell>Active</HeaderCell>
      //                 <HeaderCell>Created</HeaderCell>
      //                 <HeaderCell>Last Updated</HeaderCell>
      //               </TableRow>
      //             </TableHeader>
      //             <TableBody>
      //               {
      //                 domains.map(domain => {
      //                   return (
      //                     <TableRow key={`domain-${domain._id}`}>
      //                       <TableData label="Domain">
      //                         <Text>{domain.name}</Text>
      //                       </TableData>
      //                       <TableData label="TTL (Seconds)">
      //                         <Text>{domain.ttl}</Text>
      //                       </TableData>
      //                       <TableData label="Active">
      //                         <Center>
      //                           <Switch onChecked={
      //                             (checked: boolean) => {
      //                               domain.active = checked;
      //                               updateDomain(domain);
      //                             }
      //                           }
      //                           checked={domain.active}
      //                         />
      //                         </Center>
      //                       </TableData>
      //                       <TableData label="Created">
      //                         <Text>{new Date(domain.recordCreated).toString()}</Text>
      //                       </TableData>
      //                       <TableData label="Last Updated">
      //                         <Text>{new Date(domain.recordUpdated).toString()}</Text>
      //                       </TableData>
      //                     </TableRow>
      //                   );
      //                 })
      //               }
      //             </TableBody>
      //           </Table>
      //         </CardBody>
      //         {/* <CardFooter></CardFooter> */}
      //       </Card>
      //     </Row>

      //     <Spacer horizontal={true} />

      //     <Row>
      //       <Toolbar>
      //         <ToolbarTitle>Subdomains</ToolbarTitle>
      //       </Toolbar>
      //     </Row>
      //     <Row>
      //       <Card>
      //         <CardBody>
      //           <Table>
      //             <TableHeader>
      //               <TableRow>
      //                 <HeaderCell>Domain</HeaderCell>
      //                 <HeaderCell>Hostname</HeaderCell>
      //                 <HeaderCell>Full</HeaderCell>
      //                 <HeaderCell>Resolves To</HeaderCell>
      //                 <HeaderCell>TTL (Seconds)</HeaderCell>
      //                 <HeaderCell>Active</HeaderCell>
      //               </TableRow>
      //             </TableHeader>
      //             <TableBody>
      //               {
      //                 subdomains.map(subdomain => {
      //                   return (
      //                     <TableRow key={`subdomain-${subdomain._id}`}>
      //                       <TableData label="Domain">
      //                         <Text>{subdomain.domain}</Text>
      //                       </TableData>
      //                       <TableData label="Hostname">
      //                         <Text>{this.getSubdomainHostName(subdomain)}</Text>
      //                       </TableData>
      //                       <TableData label="Full">
      //                         <Text>{subdomain.name.substring(0, subdomain.name.length - 1)}</Text>
      //                       </TableData>
      //                       <TableData label="Resolves To">
      //                         <Text>{subdomain.ip}</Text>
      //                       </TableData>
      //                       <TableData label="TTL (Seconds)">
      //                         <Text>{subdomain.ttl}</Text>
      //                       </TableData>
      //                       <TableData label="Active">
      //                         <Center>
      //                           <Switch
      //                             checked={subdomain.active}
      //                             onChecked={
      //                               (checked: boolean) => {
      //                                 subdomain.active = checked;
      //                                 updateSubdomain(subdomain);
      //                               }
      //                             }
      //                           />
      //                         </Center>
      //                       </TableData>
      //                     </TableRow>
      //                   );
      //                 })
      //               }
      //             </TableBody>
      //           </Table>
      //         </CardBody>
      //         {/* <CardFooter></CardFooter> */}
      //       </Card>
      //     </Row>
      //   </Page>
      // </Wrapper>
    );
  }

  /**
   * Show the domains.
   * @param domains the domains.
   */
  showDomains(domains: DomainModel[]): void { this.setState({ domains }); }

  /**
   * Display an error message to the user.
   * @param error the error message to display.
   */
  showError(error: string): void {
    // TODO: implement
  }

  /**
   * Show the public IP address.
   * @param ipAddress the IP address to show.
   */
  showPublicIPAddress(ipAddress: string): void { this.setState({ publicIPAddress: ipAddress }); }
}

export default withStyles(styles, { withTheme: true })(ReactHomeView);
