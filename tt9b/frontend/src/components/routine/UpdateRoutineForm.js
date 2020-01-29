import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateRoutine } from "../../actions/routines";

// Form for updating the name of an existing routine
export class UpdateRoutineForm extends Component {
  state = {
    name: ""
  };

  static propTypes = {
    updateRoutine: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    current_routine: PropTypes.object.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    const routine = {
      id: this.props.current_routine.id,
      name,
      author: this.props.current_routine.author,
      order: this.props.current_routine.order
    };
    this.props.updateRoutine(routine);
    this.setState({
      name: ""
    });
  };

  // TODO: Update styling to use react-bootstrap
  render() {
    const { name } = this.state.name;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Update {this.props.current_routine.name}</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
              placeholder={this.props.current_routine.name}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Update
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

export default connect(mapStateToProps, { updateRoutine })(UpdateRoutineForm);
