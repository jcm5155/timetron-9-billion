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
        if (v != "Invalid token.") {
          alert.error(`${k}: ${v}`);
          console.log(`${k}: ${v}`);
        } else {
          console.log("Invalid token message blocked.");
        }
      }
    }
    if (message !== previousProps.message) {
      for (let [k, v] of Object.entries(message)) {
        console.log(`${k}: ${v}`);
        if (k != "passwordNotMatch") {
          alert.success(v);
        } else {
          alert.error(v);
        }
      }
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
