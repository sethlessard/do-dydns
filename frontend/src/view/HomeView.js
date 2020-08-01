import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";

import { fetchDomains, fetchPublicIP, fetchSubdomains } from "../redux/action/Application";
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
  TextInput,
  TableData,
  Toolbar,
  ToolbarTitle,
  ToolbarOptionContainer,
  Checkbox,
} from "@react-uix/web";

const Wrapper = styled.div``;

/**
 * Map the redux state to the HomeView component's props.
 * @param {object} state the redux state.
 * @param {object} ownProps the props passed to the HomeView component.
 * @returns {object} the mapped props.
 */
const mapStateToProps = (state, ownProps) => ({
  domains: state.application.domains,
  publicIP: state.application.publicIP,
  subdomains: state.application.subdomains
});

/**
 * Map the dispatch events as props for the HomeView component.
 */
const mapDispatchToProps = {
  fetchDomains,
  fetchPublicIP,
  fetchSubdomains
};

class HomeView extends Component {

  /**
   * HomeView constructor.
   * @param {object} props the props.
   */
  constructor(props) {
    super(props);
    this.state = {
      domainTableEditable: false,
      subdomainTableEditable: false
    };
  }

  componentDidMount() {
    // load the view
    this.props.fetchPublicIP();
    this.props.fetchDomains();
    this.props.fetchSubdomains();
  }

  /**
   * Render the HomeView component.
   */
  render() {
    const { domains = [], style: compStyle, publicIP: ip, subdomains = [] } = this.props;
    const { domainTableEditable, subdomainTableEditable } = this.state;
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
                  <Text style={{ fontWeight: "bold" }}>Current IP Address:</Text>
                  <Text>{ip}</Text>
                </Grid>
              </CardBody>
              {/* <CardFooter></CardFooter> */}
            </Card>
          </Row>

          <Spacer horizontal={true} />

          <Row>
            <Toolbar>
              <ToolbarTitle>Domains</ToolbarTitle>
              <ToolbarOptionContainer>
                <IconButton color="#fff" onClick={() => alert("not implemented.")}>add</IconButton>
                <IconButton color="#fff" onClick={() => this.setState({ domainTableEditable: !domainTableEditable })}>edit</IconButton>
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
                      <HeaderCell>Domain</HeaderCell>
                      <HeaderCell>TTL (Seconds)</HeaderCell>
                      <HeaderCell>Active</HeaderCell>
                      <HeaderCell>Created</HeaderCell>
                      <HeaderCell>Last Updated</HeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {
                      // non-editable
                      !domainTableEditable &&
                      domains.map(domain => {
                        return (
                          <TableRow key={`domain-${domain._id}`}>
                            <TableData label="Domain">
                              <Text>{domain.name}</Text>
                            </TableData>
                            <TableData label="TTL (Seconds)">
                              <Text>{domain.ttl}</Text>
                            </TableData>
                            <TableData label="Active">
                              <Text>{(domain.active) ? "Yes" : "No"}</Text>
                            </TableData>
                            <TableData label="Created">
                              <Text>{new Date(domain.recordCreated).toString()}</Text>
                            </TableData>
                            <TableData label="Last Updated">
                              <Text>{new Date(domain.recordUpdated).toString()}</Text>
                            </TableData>
                          </TableRow>
                        );
                      })
                    }
                    {
                      // editable
                      domainTableEditable &&
                      domains.map(domain => (
                        <TableRow key={`domain-${domain._id}`}>
                          <TableData label="Domain">
                            <TextInput placeholder={domain.name} onChange={(text) => alert("not implemented")} />
                          </TableData>
                          <TableData>
                            <TextInput placeholder={domain.ttl} onChange={(text) => alert("not implemented.")} />
                          </TableData>
                          <TableData label="Active">
                            <Checkbox checked={domain.active} onChecked={() => alert("not implemented.")} />
                            <Text>{(domain.active) ? "Yes" : "No"}</Text>
                          </TableData>
                          <TableData label="Created">
                            <Text>{new Date(domain.recordCreated).toString()}</Text>
                          </TableData>
                          <TableData label="Last Updated">
                            <Text>{new Date(domain.recordUpdated).toString()}</Text>
                          </TableData>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
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
                      <HeaderCell>Subdomain</HeaderCell>
                      <HeaderCell>Resolves To</HeaderCell>
                      <HeaderCell>TTL (Seconds)</HeaderCell>
                      <HeaderCell>Active</HeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {
                      // non-editable
                      !subdomainTableEditable && 
                      subdomains.map(subdomain => {
                        return (
                          <TableRow key={`subdomain-${subdomain._id}`}>
                            <TableData label="Subdomain">
                              <Text>{subdomain.name}</Text>
                            </TableData>
                            <TableData label="Resolves To">
                              <Text>{subdomain.ip}</Text>
                            </TableData>
                            <TableData label="TTL (Seconds)">
                              <Text>{subdomain.ttl}</Text>
                            </TableData>
                            <TableData label="Active">
                              <Text>{(subdomain.active) ? "Yes" : "No"}</Text>
                            </TableData>
                          </TableRow>
                        );
                      })
                    }
                    {
                      // editable
                      subdomainTableEditable && 
                      subdomains.map(subdomain => {
                        return (
                          <TableRow key={`subdomain-${subdomain._id}`}>
                            <TableData label="Subdomain">
                              <TextInput placeholder={subdomain.name} onChange={() => alert("not implemented.")} />
                            </TableData>
                            <TableData label="Resolves To">
                              <Text>{subdomain.ip}</Text>
                            </TableData>
                            <TableData label="TTL (Seconds)">
                              <TextInput placeholder={subdomain.ttl} onChange={(text) => alert("not implemented.")} />
                            </TableData>
                            <TableData label="Active">
                              <Checkbox checked={subdomain.active} onChecked={() => alert("not implemented.")} />
                              <Text>{(subdomain.active) ? "Yes" : "No"}</Text>
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
