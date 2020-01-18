import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRoutines, deleteRoutine } from "../../actions/routines";

export class Routines extends Component {
  static propTypes = {
    routines: PropTypes.array.isRequired,
    getRoutines: PropTypes.func.isRequired,
    deleteRoutine: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getRoutines();
  }

  render() {
    return (
      <Fragment>
        <h1>Routines</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date Created</th>
              <th>Total Time</th>
              <th>Plays</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.routines.map(routine => (
              <tr key={routine.id}>
                <td>{routine.name}</td>
                <td>{routine.date_created}</td>
                <td>Total Time (NYI)</td>
                <td>{routine.plays}</td>
                <td>
                  <button className="btn btn-secondary btn-sm">Edit</button>
                </td>
                <td>
                  <button
                    onClick={this.props.deleteRoutine.bind(this, routine.id)}
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
  routines: state.routines.routines
});

export default connect(mapStateToProps, { getRoutines, deleteRoutine })(
  Routines
);
