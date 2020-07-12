import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";

import { fetchPublicIPRequest, fetchSubdomainsRequest } from "../redux/action/Application";
import {
  IconButton,
  Page,
  Card,
  CardHeader,
  Heading,
  CardBody,
  // CardFooter,
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
  Toolbar,
  ToolbarTitle,
  ToolbarOptionContainer,
} from "@react-uix/web";

const Wrapper = styled.div``;

/**
 * Map the redux state to the HomeView component's props.
 * @param {object} state the redux state.
 * @param {object} ownProps the props passed to the HomeView component.
 * @returns {object} the mapped props.
 */
const mapStateToProps = (state, ownProps) => ({
  publicIP: state.application.publicIP,
  subdomains: state.application.subdomains
});

/**
 * Map the dispatch events as props for the HomeView component.
 */
const mapDispatchToProps = {
  fetchPublicIPRequest,
  fetchSubdomainsRequest
};

class HomeView extends Component {

  /**
   * HomeView constructor.
   * @param {object} props the props.
   */
  constructor(props) {
      super(props);
      this.state = {
      };
  }

  componentDidMount() {
    // load the view
    this.props.fetchPublicIPRequest();
    this.props.fetchSubdomainsRequest();
  }
  
  /**
   * Render the HomeView component.
   */
  render() {
    const { style: compStyle, publicIP: ip, subdomains = [] } = this.props;
    const style = {
      homeView: {

      }
    };
    Object.assign(style.homeView, compStyle);
    return (
      <Wrapper style={style.homeView}>
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
              {/* <CardFooter></CardFooter> */}
            </Card>
          </Row>  
          
          <Spacer horizontal={true} />

          <Row>
            <Toolbar>
              <ToolbarTitle>Subdomains</ToolbarTitle>
              <ToolbarOptionContainer>
                <IconButton color="#fff" onClick={() => alert("not implemented.")}>add</IconButton>
                  <IconButton color="#fff" onClick={() => alert("not implemented.")}>edit</IconButton>
                  <IconButton color="#fff" onClick={() => alert("not implemented.")}>delete</IconButton>
              </ToolbarOptionContainer>
            </Toolbar>  
          </Row>
          <Row>
            <Card>
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
              {/* <CardFooter></CardFooter> */}
            </Card>
          </Row>
        </Page>
      </Wrapper>
    );
  }

  /**          
   * Show an error.
   * @param {any} err any error.
   */
  showError(err) {
    alert(err);
  }
}

HomeView.propTypes = {
  children: PropTypes.node
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
