import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSegments } from "../../actions/segments";

export class Segments extends Component {
  static propTypes = {
    segments: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getSegments();
  }

  render() {
    return (
      <div>
        <h1>Segment List</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  segments: state.segments.segments
});

export default connect(mapStateToProps, { getSegments })(Segments);
