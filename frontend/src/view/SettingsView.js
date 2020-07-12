import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";

import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Page,
  Row,
  //Text
} from "@react-uix/web";

const Wrapper = styled.div``;

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
const mapDispatchToProps = (dispatch) => ({

});

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

              </CardBody>
              {/* <CardFooter></CardFooter> */}
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
