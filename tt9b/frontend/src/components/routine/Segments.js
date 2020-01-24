import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSegments, deleteSegment, addSegment } from "../../actions/segments";
import { formatTime } from "../../utils/SharedFunctions";

export class RoutineTimer extends Component {
  static propTypes = {
    current_routine: PropTypes.object.isRequired,
    segments: PropTypes.array.isRequired
  };

  render() {
    return (
      <Fragment>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Duration</th>
              <th>Position</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.segments.map(segment => (
              <tr key={segment.id}>
                <td>{segment.name}</td>
                <td>{formatTime(segment.duration, 0)}</td>
                <td>{segment.position}</td>
                <td>
                  <button
                    onClick={this.props.deleteSegment.bind(this, segment.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  current_routine: state.routines.current_routine,
  segments: state.segments.segments
});

export default connect(mapStateToProps, {
  getSegments,
  deleteSegment,
  addSegment
})(RoutineTimer);
