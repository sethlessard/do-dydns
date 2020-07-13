import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Page,
  Row,
  Table,
  TableBody,
  TableData,
  TableRow,
  Text,
  TextInput,
  Button
} from "@react-uix/web";
import { fetchApiKeyRequest, updateApiKey } from "../redux/action/Settings";

const Wrapper = styled.div``;
const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

/**
 * Map the redux state to the SettingsView component's props.
 * @param {object} state the redux state.
 * @param {object} ownProps the props passed to the SettingsView component.
 * @returns {object} the mapped props.
 */
const mapStateToProps = (state, ownProps) => ({

});

/**
 * Map the dispatch events as props for the SettingsView component.
 */
const mapDispatchToProps = {
  fetchApiKeyRequest,
  updateApiKey
};

class SettingsView extends Component {

  /**
   * SettingsView constructor.
   * @param {object} props the props.
   */
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.props.fetchApiKeyRequest();
  }

  /**
   * Render the SettingsView component.
   */
  render() {
    const { style: compStyle } = this.props;
    const style = {
      settingsView: {

      }
    };
    Object.assign(style.settingsView, compStyle);
    return (
      <Wrapper style={style.settingsView}>
        <Page>
          <Row>
            <Card z={2}>
              <CardHeader>
                <Heading h={6}>Settings</Heading>
              </CardHeader>
              <CardBody>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableData>
                        <Text style={{ fontWeight: "bold" }}>API Token</Text>
                      </TableData>
                      <TableData>
                        <TextInput onChange={(text) => this.props.updateApiKey(text)} placeholder="12345678901234567890" />
                      </TableData>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBody>
              <CardFooter>
                <FooterWrapper>
                  <Button
                    onClick={() => alert("not implemented.")}
                    style={{ float: "right" }}
                  >
                    Save
                  </Button>
                </FooterWrapper>
              </CardFooter>
            </Card>
          </Row>
        </Page>
      </Wrapper>
    );
  }
}

SettingsView.propTypes = {
  children: PropTypes.node
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
