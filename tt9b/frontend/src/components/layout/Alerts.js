import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(previousProps) {
    const { error, alert, message } = this.props;
    if (error !== previousProps.error) {
      if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
      if (error.msg.message)
        alert.error(`Message: ${error.msg.message.join()}`);
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
