import React, { Component, CSSProperties, ReactNode } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as _ from "lodash";

import { fetchDomains, fetchPublicIP, fetchSubdomains, updateDomain, updateSubdomain } from "../redux/action/Application";
import { ApplicationState } from "../redux/reducer/ApplicationReducer";
import DomainModel from "../model/DomainModel";
import SubdomainModel from "../model/SubdomainModel";
const {
  Page,
  Card,
  CardHeader,
  Heading,
  CardBody,
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
  Switch
} = require("@react-uix/web");

const Wrapper = styled.div``;
const Center = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media(max-width: 420px) {
    justify-content: flex-end;
  }
`;

export interface HomeViewProps {
  children?: ReactNode[];
  style?: CSSProperties;
};

/**
 * Map the redux state to the HomeView component's props.
 * @param state the redux state.
 * @returns the mapped props.
 */
const mapStateToProps = (state: { application: ApplicationState }) => ({
  domains: _.orderBy(state.application.domains, "name", "asc"),
  publicIP: state.application.publicIP,
  subdomains: _.orderBy(state.application.subdomains, "name", "asc")
});

/**
 * Map the dispatch events as props for the HomeView component.
 */
const mapDispatchToProps = {
  fetchDomains,
  fetchPublicIP,
  fetchSubdomains,
  updateDomain,
  updateSubdomain
};

interface ConnectedHomeViewProps extends HomeViewProps {
  domains: DomainModel[];
  fetchDomains: () => void;
  fetchPublicIP: () => void;
  fetchSubdomains: () => void;
  publicIP: string;
  subdomains: SubdomainModel[];
  updateDomain: (domain: DomainModel) => void;
  updateSubdomain: (subdomain: SubdomainModel) => void;
}

class HomeView extends Component<HomeViewProps> {

  /**
   * HomeView constructor.
   * @param props the props.
   */
  constructor(props: HomeViewProps) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { fetchDomains, fetchPublicIP, fetchSubdomains } = this.props as ConnectedHomeViewProps;
    // load the view
    fetchPublicIP();
    fetchDomains();
    fetchSubdomains();
  }

  /**
   * Render the HomeView component.
   */
  render() {
    const { domains = [], style: compStyle, publicIP: ip, subdomains = [], updateDomain, updateSubdomain } = this.props as ConnectedHomeViewProps;
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
                              <Center>
                                <Switch onChecked={
                                  (checked: boolean) => {
                                    domain.active = checked;
                                    updateDomain(domain);
                                  }
                                }
                                checked={domain.active}
                              />
                              </Center>
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
            </Toolbar>
          </Row>
          <Row>
            <Card>
              <CardBody>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <HeaderCell>Domain</HeaderCell>
                      <HeaderCell>Hostname</HeaderCell>
                      <HeaderCell>Full</HeaderCell>
                      <HeaderCell>Resolves To</HeaderCell>
                      <HeaderCell>TTL (Seconds)</HeaderCell>
                      <HeaderCell>Active</HeaderCell>
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
                              <Text>{this.getSubdomainHostName(subdomain)}</Text>
                            </TableData>
                            <TableData label="Full">
                              <Text>{subdomain.name.substring(0, subdomain.name.length - 1)}</Text>
                            </TableData>
                            <TableData label="Resolves To">
                              <Text>{subdomain.ip}</Text>
                            </TableData>
                            <TableData label="TTL (Seconds)">
                              <Text>{subdomain.ttl}</Text>
                            </TableData>
                            <TableData label="Active">
                              <Center>
                                <Switch
                                  checked={subdomain.active}
                                  onChecked={
                                    (checked: boolean) => {
                                      subdomain.active = checked;
                                      updateSubdomain(subdomain);
                                    }
                                  }
                                />
                              </Center>
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
   * 
   * @param subdomain the subdomain.
   */
  getSubdomainHostName(subdomain: SubdomainModel) {
    let hostname = subdomain.name.substring(0, subdomain.name.length - 1);
    hostname = hostname.replace(subdomain.domain, "");
    if (hostname === "") hostname = "@";
    else hostname = hostname.substring(0, hostname.length - 1);
    return hostname;
  }

  /**          
   * Show an error.
   * @param err any error.
   */
  showError(err: Error | string) {
    alert(err);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
