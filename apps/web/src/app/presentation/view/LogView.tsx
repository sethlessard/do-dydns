import React, { Component, CSSProperties, ReactNode } from "react";

// import LogModel from "../model/LogModel";

export class LogView extends Component {

  /**
   * LogView constructor.
   */
  constructor() {
    super({});
    this.state = {

    };
  }

  /**
   * Render the LogView component.
   */
  render() {
    return (
      <div />
        // <Page>
        //   <Row>
        //     <Toolbar>
        //       <ToolbarTitle>Logs</ToolbarTitle>
        //       <ToolbarOptionContainer>
        //         <IconButton color="#fff" onClick={fetchLogs}>refresh</IconButton>
        //         <IconButton color="#fff" onClick={deleteLogs}>delete</IconButton>
        //       </ToolbarOptionContainer>
        //     </Toolbar>
        //   </Row>
        //   <Row>
        //     <Card>
        //       <CardBody>
        //         {logs.map(log => {
        //           const created = new Date(log.recordCreated);
        //           return (
        //             <LogWrapper>
        //               <LogDateTime key={`log-${log._id}`}>{`${created.toLocaleDateString()} ${created.toLocaleTimeString()}: `}</LogDateTime>
        //               <LogMessage>
        //                 {log.message}
        //               </LogMessage>
        //             </LogWrapper>
        //           )
        //         })}
        //       </CardBody>
        //       {/* <CardFooter></CardFooter> */}
        //     </Card>
        //   </Row>
        // </Page>
    );
  }
}
