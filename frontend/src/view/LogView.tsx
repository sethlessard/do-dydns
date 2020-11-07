import React, { Component, CSSProperties, ReactNode } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { deleteLogs, fetchLogs } from "../redux/action/Application";
import { ApplicationState } from "../redux/reducer/ApplicationReducer";
import LogModel from "../model/LogModel";
import media, { ScreenType } from "../media/media";

const {
  Card,
  CardBody,
  Page,
  Row,
  Toolbar,
  ToolbarOptionContainer,
  IconButton,
  ToolbarTitle
} = require("@react-uix/web");

const Wrapper = styled.div``;
const LogWrapper = styled.div`
  font-size: .85rem;
  ${media(ScreenType.Phone)`
    font-size: .7rem;
    padding: 0 0 .5em 0;
  `}
`;
const LogDateTime = styled.span`
  font-weight: bold;
  font-style: italic;
  ${media(ScreenType.Phone)`
    display: block;
  `}
`;
const LogMessage = styled.span``;

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
  deleteLogs,
  fetchLogs
};

interface ConnectedLogViewProps extends LogViewProps {
  logs: LogModel[];
  deleteLogs: () => void;
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
    const { logs = [], style: compStyle, deleteLogs, fetchLogs } = this.props as ConnectedLogViewProps;
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
                <IconButton color="#fff" onClick={fetchLogs}>refresh</IconButton>
                <IconButton color="#fff" onClick={deleteLogs}>delete</IconButton>
              </ToolbarOptionContainer>
            </Toolbar>
          </Row>
          <Row>
            <Card>
              <CardBody>
                {logs.map(log => {
                  const created = new Date(log.recordCreated);
                  return (
                    <LogWrapper>
                      <LogDateTime key={`log-${log._id}`}>{`${created.toLocaleDateString()} ${created.toLocaleTimeString()}: `}</LogDateTime>
                      <LogMessage>
                        {log.message}
                      </LogMessage>
                    </LogWrapper>
                  )
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
