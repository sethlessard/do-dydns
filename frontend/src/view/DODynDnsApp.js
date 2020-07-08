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
  GridItem,
  Text,
  Table,
  TableHeader,
  TableRow,
  HeaderCell,
  TableBody,
  Spacer,
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
        ip: 'x.x.x.x'
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
    const { ip } = this.state;
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
          <Card z={2}>
            <CardHeader>
              <Heading h={6}>Status</Heading>
            </CardHeader>
            <CardBody>
              <Grid columns={2}>
                <GridItem>
                  <Text style={{fontWeight: "bold"}}>Current IP Address:</Text>
                </GridItem>
                  <GridItem>
                    <div style={{float: "right"}}>
                      <Text>{ip}</Text>
                    </div>
                    hi
                </GridItem>
              </Grid>
            </CardBody>
            <CardFooter>

            </CardFooter>
          </Card>
          
          <Spacer horizontal={true} />

          <Card>
            <CardHeader>
              <Heading h={6}>Domains</Heading>
            </CardHeader>   
              <CardBody>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <HeaderCell>Subdomain</HeaderCell>
                      <HeaderCell>Domain</HeaderCell>
                      <HeaderCell>Last Updated</HeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* TODO: populate subdomains */}
                  </TableBody>
                </Table>
            </CardBody>   
            <CardFooter></CardFooter>   
          </Card>
        </Page>
      </AppContent>
    </App>
    );
  }

  /**
   * Show the external ip address.
   * @param {string} ip the current ip address.
   */
  showIPAddress(ip) {
    this.setState({ ip });
  }

  showError(err) {
    alert(err);
  }
}

DODynDnsApp.propTypes = {
  children: PropTypes.node
};

export default DODynDnsApp;
