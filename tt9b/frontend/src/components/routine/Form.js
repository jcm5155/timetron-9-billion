import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSegment } from "../../actions/segments";
import { segmentFormSanitizer } from "../../utils/SharedFunctions";

export class Form extends Component {
  state = {
    name: "",
    durationS: "",
    durationM: "",
    durationH: "",
    position: ""
  };

  static propTypes = {
    addSegment: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { id } = this.props.current_routine;
    const { name, position, durationS, durationM, durationH } = this.state;
    const duration =
      segmentFormSanitizer(durationS, "s") +
      segmentFormSanitizer(durationM, "m") +
      segmentFormSanitizer(durationH, "h");
    const segment = {
      name,
      duration: duration,
      position,
      parent: id
    };
    this.props.addSegment(segment);
    this.setState({
      name: "",
      durationS: "",
      durationM: "",
      durationH: "",
      position: ""
    });
  };

  render() {
    const { name, durationS, durationM, durationH, position } = this.state;
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
            <label>Position</label>
            <input
              className="form-control"
              type="text"
              name="position"
              onChange={this.onChange}
              value={position}
            />
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
  current_routine: state.routines.current_routine
});

export default connect(mapStateToProps, { addSegment })(Form);
