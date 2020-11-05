import React, { Component, CSSProperties, ReactNode } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { fetchLogs } from "../redux/action/Application";
import { ApplicationState } from "../redux/reducer/ApplicationReducer";
import LogModel from "../model/LogModel";

const {
  Card,
  CardBody,
  Page,
  Row,
  Text,
  Toolbar,
  ToolbarOptionContainer,
  IconButton,
  ToolbarTitle
} = require("@react-uix/web");

const Wrapper = styled.div``;

export interface LogViewProps {
  children?: ReactNode[];
  style?: CSSProperties;
}

/**
 * Map the redux state to the LogView component's props.
 * @param state the redux state.
 * @returns the mapped props.
 */
const mapStateToProps = (state: { application: ApplicationState }) => ({
  logs: state.application.logs
});

/**
 * Map the dispatch events as props for the LogView component.
 */
const mapDispatchToProps = {
  fetchLogs
};

interface ConnectedLogViewProps extends LogViewProps {
  logs: LogModel[];
  fetchLogs: () => void;
}

class LogView extends Component<LogViewProps> {

  /**
   * LogView constructor.
   * @param props the props.
   */
  constructor(props: LogViewProps) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    (this.props as ConnectedLogViewProps).fetchLogs();
  }

  /**
   * Render the LogView component.
   */
  render() {
    const { logs = [], style: compStyle, fetchLogs } = this.props as ConnectedLogViewProps;
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
                <IconButton color="#fff" onClick={() => fetchLogs()}>refresh</IconButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(LogView);