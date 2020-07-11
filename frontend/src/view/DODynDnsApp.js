import React, { Component } from "react";
import PropTypes from "prop-types";
// import styled from "styled-components";

import {
  App,
  Appbar,
  AppTitleContainer,
  AppTitle,
  AppbarToolbar,
  IconButton,
  AppContent,
  Page,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Grid,
  Row,
  Text,
  Table,
  TableHeader,
  TableRow,
  HeaderCell,
  TableBody,
  Spacer,
  TableData,
} from "@react-uix/web";
import DODynDnsController from "../controller/DODynDnsController";

// const Wrapper = styled.div``;

const theme = {
  colorPrimary: "#000000",
  colorSecondary: "#000000",
  text: {
    colorOnLight: "#111111",
    colorOnDark: "#ffffff"
  }
};

class DODynDnsApp extends Component {

  /**
   * DODynDnsApp constructor.
   * @param {object} props the props.
   */
  constructor(props) {
      super(props);
      this.state = {
        controller: new DODynDnsController(this),
        ip: 'x.x.x.x',
        subdomains: []
      };
  }

  componentDidMount() {
    const { controller } = this.state;
    controller.initializeView();
  }
  
  /**
   * Render the DODynDnsApp component.
   */
  render() {
    const { style: compStyle } = this.props;
    const { ip, subdomains = [] } = this.state;
    const style = {
      dODynDnsApp: {

      }
    };
    Object.assign(style.dODynDnsApp, compStyle);
    return (
      <App theme={theme}>
      {/* 
      
      Appbar

      */}
      <Appbar>
        <AppTitleContainer>
          <AppTitle>Digital Ocean Dynamic DNS</AppTitle>
        </AppTitleContainer>
        <AppbarToolbar>
          <IconButton color="#fff">more_vert</IconButton>
        </AppbarToolbar>
      </Appbar>

      {/* 
      
      Content
      
      */}
      <AppContent>
        <Page>
          <Row>
            <Card z={2}>
              <CardHeader>
                <Heading h={6}>Status</Heading>
              </CardHeader>
              <CardBody>
                <Grid columns={2}>
                    <Text style={{fontWeight: "bold"}}>Current IP Address:</Text>
                    <Text>{ip}</Text>
                </Grid>
              </CardBody>
              <CardFooter>

              </CardFooter>
            </Card>
          </Row>  
          
          <Spacer horizontal={true} />

          <Row>
            <Card>
              <CardHeader>
                <Heading h={6}>Domains</Heading>
              </CardHeader>   
                <CardBody>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <HeaderCell>Hostname</HeaderCell>
                        <HeaderCell>Domain</HeaderCell>
                        <HeaderCell>Resolves To</HeaderCell>
                        <HeaderCell>Active</HeaderCell>
                        <HeaderCell>Created</HeaderCell>
                        <HeaderCell>Last Updated</HeaderCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        subdomains.map(subdomain => {
                          return (
                            <TableRow key={`subdomain-${subdomain._id}`}>
                              <TableData label="Domain">
                                <Text>{subdomain.domain}</Text>
                              </TableData>
                              <TableData label="Hostname">
                                <Text>{subdomain.hostname}</Text>
                              </TableData>
                              <TableData label="Resolves To">
                                <Text>{`${subdomain.hostname}.${subdomain.domain}`}</Text>
                              </TableData>
                              <TableData label="Active">
                                <Text>{(subdomain.active) ? "Yes" : "No"}</Text>
                              </TableData>
                              <TableData label="Created">
                                <Text>{new Date(subdomain.recordCreated).toString()}</Text>
                              </TableData>
                              <TableData label="Last Updated">
                                <Text>{new Date(subdomain.recordUpdated).toString()}</Text>
                              </TableData>
                            </TableRow>
                          );
                        })
                      }
                    </TableBody>
                  </Table>
              </CardBody>   
              <CardFooter></CardFooter>   
            </Card>
          </Row>
        </Page>
      </AppContent>
    </App>
    );
  }

  /**
   * Show an error.
   * @param {any} err any error.
   */
  showError(err) {
    alert(err);
  }

  /**
   * Show the external ip address.
   * @param {string} ip the current ip address.
   */
  showIPAddress(ip) {
    this.setState({ ip });
  }

  /**
   * Show the subdomains.
   * @param {{ _id: string, hostname: string, domain: string, active: boolean, recordCreated: number, recordUpdated: number }} subdomains the subdomains.
   */
  showSubdomains(subdomains) {
    if (subdomains)
      this.setState({ subdomains });
  }
}

DODynDnsApp.propTypes = {
  children: PropTypes.node
};

export default DODynDnsApp;
