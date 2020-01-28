import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addRoutine } from "../../actions/routines";

// Form for adding a new routine for the current user.
export class NewRoutineForm extends Component {
  state = {
    name: ""
  };

  static propTypes = {
    addRoutine: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  // Handler for the form submit button
  onSubmit = e => {
    e.preventDefault();
    const { id } = this.props.auth.user;
    const { name } = this.state;
    const routine = {
      name: name,
      author: id
    };
    this.props.addRoutine(routine);
    this.setState({
      name: ""
    });
  };

  // TODO: change this styling over to react-bootstrap
  render() {
    const { name } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Routine</h2>
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
  auth: state.auth
});

export default connect(mapStateToProps, { addRoutine })(NewRoutineForm);
