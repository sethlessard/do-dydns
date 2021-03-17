import React, { Component } from "react";

export class SettingsView extends Component {

  /**
   * SettingsView constructor.
   */
  constructor() {
    super({});
    this.state = {

    };
  }

  /**
   * Render the SettingsView component.
   */
  render() {
    return (
      <div />
      //   <Page>
      //     <Row>
      //       <Card z={2}>
      //         <CardHeader>
      //           <Heading h={6}>Settings</Heading>
      //         </CardHeader>
      //         <CardBody>
      //           <Table>
      //             <TableBody>
      //               <TableRow>
      //                 <TableData>
      //                   <Text style={{ fontWeight: "bold" }}>API Token</Text>
      //                 </TableData>
      //                 <TableData>
      //                   <TextInput
      //                     style={{ width: "100%" }}
      //                     onChange={(text: string) => {
      //                       const newSettings = Object.assign({}, settings);
      //                       // TODO: verify text
      //                       newSettings.apiKey = text;
      //                       updateSettings(newSettings);
      //                     }}
      //                     placeholder={settings.apiKey}
      //                   />
      //                 </TableData>
      //               </TableRow>
      //               <TableRow>
      //                 <TableData>
      //                   <Text style={{ fontWeight: "bold" }}>Network Update Interval (Minutes)</Text>
      //                 </TableData>
      //                 <TableData>
      //                   <TextInput
      //                     style={{ width: "100%" }}
      //                     onChange={(text: string) => {
      //                       const newSettings = Object.assign({}, settings);
      //                       // TODO: validate text
      //                       try {
      //                         newSettings.networkUpdateIntervalMinutes = parseInt(text, 10);
      //                         updateSettings(newSettings);
      //                       } catch (e) {
      //                         alert(e);
      //                       }
      //                     }}
      //                     placeholder={`${settings.networkUpdateIntervalMinutes}`}
      //                   />
      //                 </TableData>
      //               </TableRow>
      //             </TableBody>
      //           </Table>
      //         </CardBody>
      //         <CardFooter>
      //           <FooterWrapper>
      //             <Button
      //               onClick={() => saveSettings(settings)}
      //             >
      //               Save
      //             </Button>
      //           </FooterWrapper>
      //         </CardFooter>
      //       </Card>
      //     </Row>
      //   </Page>
      // </Wrapper>
    );
  }
}
