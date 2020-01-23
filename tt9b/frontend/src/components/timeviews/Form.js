import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSegment } from "../../actions/segments";

export class Form extends Component {
  state = {
    name: "",
    duration: "",
    position: ""
  };

  static propTypes = {
    addSegment: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { id } = this.props.current_routine;
    const { name, duration, position } = this.state;
    const segment = {
      name,
      duration,
      position,
      parent: id
    };
    this.props.addSegment(segment);
    console.log(segment);
    this.setState({
      name: "",
      duration: "",
      position: ""
    });
  };

  render() {
    const { name, duration, position } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Segment</h2>
        <form onSubmit={this.onSubmit}>
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

          <div className="form-group">
            <label>Duration</label>
            <input
              className="form-control"
              type="text"
              name="duration"
              onChange={this.onChange}
              value={duration}
            />
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
