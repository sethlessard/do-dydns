import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";

import {
  Card,
  CardBody,
  // CardHeader,
  // CardFooter,
  Page,
  Row,
  // Heading,
  Text,
  Toolbar,
  ToolbarOptionContainer,
  IconButton,
  ToolbarTitle
} from "@react-uix/web";

import { fetchLogs } from "../redux/action/Application";

const Wrapper = styled.div``;

/**
 * Map the redux state to the LogView component's props.
 * @param {object} state the redux state.
 * @param {object} ownProps the props passed to the LogView component.
 * @returns {object} the mapped props.
 */
const mapStateToProps = (state, ownProps) => ({
  logs: state.application.logs
});

/**
 * Map the dispatch events as props for the LogView component.
 */
const mapDispatchToProps = {
  fetchLogs
};

class LogView extends Component {

  /**
   * LogView constructor.
   * @param {object} props the props.
   */
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.props.fetchLogs();
  }

  /**
   * Render the LogView component.
   */
  render() {
    const { logs = [], style: compStyle } = this.props;
    const style = {
      logView: {

      }
    };
    Object.assign(style.logView, compStyle);
    return (
      <Wrapper style={style.logView}>
        <Page>
          <Row>
            <Toolbar>
              <ToolbarTitle>Logs</ToolbarTitle>
              <ToolbarOptionContainer>
                <IconButton color="#fff" onClick={() => this.props.fetchLogs()}>refresh</IconButton>
              </ToolbarOptionContainer>
            </Toolbar>
          </Row>
          <Row>
            <Card>
              <CardBody>
                {logs.map(log => {
                  const created = new Date(log.recordCreated);
                  return <Text key={`log-${log._id}`}>{`${created.toLocaleDateString()} ${created.toLocaleTimeString()} > ${log.message}`}</Text>;
                })}
              </CardBody>
              {/* <CardFooter></CardFooter> */}
            </Card>
          </Row>
        </Page>
      </Wrapper>
    );
  }
}

LogView.propTypes = {
  children: PropTypes.node
};

export default connect(mapStateToProps, mapDispatchToProps)(LogView);
