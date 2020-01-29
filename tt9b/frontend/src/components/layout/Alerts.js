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

  // Kind of sloppy way of displaying the correct popup message. I will either refactor this or just remove it entirely later
  componentDidUpdate(previousProps) {
    const { error, alert, message } = this.props;
    if (error !== previousProps.error) {
      if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
      if (error.msg.message) alert.error(`Message: ${error.msg.message.join()}`);
      if (error.msg.username) alert.error(`Username: ${error.msg.username.join()}`);
      if (error.msg.password) alert.error(`Password: ${error.msg.password.join()}`);
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
