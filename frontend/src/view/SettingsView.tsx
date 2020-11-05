import React, { Component, CSSProperties, ReactNode } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchSettings, saveSettings, updateSettings } from "../redux/action/Settings";
import SettingsModel from "../model/SettingsModel";
import { SettingsState } from "../redux/reducer/SettingsReducer";

const {
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
} = require("@react-uix/web");

const Wrapper = styled.div``;
const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export interface SettingsViewProps {
  children?: ReactNode[];
  style?: CSSProperties;
}

/**
 * Map the redux state to the SettingsView component's props.
 * @param state the redux state.
 * @returns the mapped props.
 */
const mapStateToProps = (state: { settings: SettingsState }) => ({
  settings: state.settings.settings
});

/**
 * Map the dispatch events as props for the SettingsView component.
 */
const mapDispatchToProps = {
  fetchSettings,
  saveSettings,
  updateSettings
};

interface ConnectedSettingsViewProps extends SettingsViewProps {
  fetchSettings: () => void;
  saveSettings: (settings: SettingsModel) => void;
  settings: SettingsModel;
  updateSettings: (settings: SettingsModel) => void;
}

class SettingsView extends Component<SettingsViewProps> {

  /**
   * SettingsView constructor.
   * @param {object} props the props.
   */
  constructor(props: SettingsViewProps) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    (this.props as ConnectedSettingsViewProps).fetchSettings();
  }

  /**
   * Render the SettingsView component.
   */
  render() {
    const { saveSettings, style: compStyle, settings, updateSettings } = this.props as ConnectedSettingsViewProps;
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
                        <TextInput
                          style={{ width: "100%" }}
                          onChange={(text: string) => {
                            const newSettings = Object.assign({}, settings);
                            // TODO: verify text
                            newSettings.apiKey = text;
                            updateSettings(newSettings);
                          }}
                          placeholder={settings.apiKey}
                        />
                      </TableData>
                    </TableRow>
                    <TableRow>
                      <TableData>
                        <Text style={{ fontWeight: "bold" }}>Network Update Interval (Minutes)</Text>
                      </TableData>
                      <TableData>
                        <TextInput
                          style={{ width: "100%" }}
                          onChange={(text: string) => {
                            const newSettings = Object.assign({}, settings);
                            // TODO: validate text
                            try {
                              newSettings.networkUpdateIntervalMinutes = parseInt(text, 10);
                              updateSettings(newSettings);
                            } catch (e) {
                              alert(e);
                            }
                          }}
                          placeholder={`${settings.networkUpdateIntervalMinutes}`}
                        />
                      </TableData>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBody>
              <CardFooter>
                <FooterWrapper>
                  <Button
                    onClick={() => saveSettings(settings)}
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
