import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Displays alerts when specific actions are made
export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  // Displays error messages as alerts
  componentDidUpdate(previousProps) {
    const { error, alert, message } = this.props;
    if (error !== previousProps.error) {
      for (let [k, v] of Object.entries(error.msg)) {
        alert.error(`${k}: ${v}`);
        console.log(`${k}: ${v}`);
      }
    }
    if (message !== previousProps.message) {
      if (message.routineDelete) alert.success(message.routineDelete);
      if (message.routineAdd) alert.success(message.routineAdd);
      if (message.segmentDelete) alert.success(message.segmentDelete);
      if (message.segmentAdd) alert.success(message.segmentAdd);
      if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
    }
  }
  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
