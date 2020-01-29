import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateRoutine } from "../../actions/routines";
import { addSegment, updateSegmentOrder } from "../../actions/segments";
import { segmentFormSanitizer, sortSegmentsByOrder } from "../../utils/SharedFunctions";

// Form for making a new time segment
export class NewSegmentForm extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    current_routine: PropTypes.object.isRequired,
    segments: PropTypes.array.isRequired,
    updateSegmentOrder: PropTypes.func.isRequired,
    addSegment: PropTypes.func.isRequired
  };

  state = {
    name: "",
    durationS: "",
    durationM: "",
    durationH: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { id } = this.props.current_routine;
    const { name, durationS, durationM, durationH } = this.state;
    // Duration from the form inputs converted into seconds
    const duration =
      segmentFormSanitizer(durationS, "s") +
      segmentFormSanitizer(durationM, "m") +
      segmentFormSanitizer(durationH, "h");

    const newSegment = this.props.addSegment({
      name,
      duration: duration,
      parent: id
    });

    const newOrderString = `${this.props.current_routine.order},${newSegment.id}`;

    updateRoutine({
      ...this.props.current_routine,
      order: newOrderString
    });

    this.props.updateSegmentOrder(sortSegmentsByOrder(newOrderString, this.props.segments));

    this.setState({
      name: "",
      durationS: "",
      durationM: "",
      durationH: ""
    });
  };

  // TODO: change this styling over to react-bootstrap
  render() {
    const { name, durationS, durationM, durationH } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Segment</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                onChange={this.onChange}
                value={name}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Duration</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">S</div>
                </div>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  name="durationS"
                  onChange={this.onChange}
                  value={durationS}
                />
              </div>

              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">M</div>
                </div>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  name="durationM"
                  onChange={this.onChange}
                  value={durationM}
                />
              </div>

              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">H</div>
                </div>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  name="durationH"
                  onChange={this.onChange}
                  value={durationH}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  current_routine: state.routines.current_routine,
  segments: state.segments.segments
});

export default connect(mapStateToProps, { updateSegmentOrder, addSegment })(NewSegmentForm);
