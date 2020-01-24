import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRoutines, deleteRoutine, setCurrentRoutine } from "../../actions/routines";
import { getSegments } from "../../actions/segments";
import { Redirect } from "react-router-dom";
import { moment } from "moment";
import { formatTime, totalTime } from "../../utils/SharedFunctions";

export class Routines extends Component {
  constructor(props) {
    super(props);
    this.onSelectClick = this.onSelectClick.bind(this);
    this.setStateAsync = this.setStateAsync.bind(this);
    this.state = {
      redirect: false
    };
  }

  static propTypes = {
    routines: PropTypes.array.isRequired,
    getRoutines: PropTypes.func.isRequired,
    deleteRoutine: PropTypes.func.isRequired,
    setCurrentRoutine: PropTypes.func.isRequired,
    getSegments: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getRoutines();
  }

  componentWillUnmount() {
    this.setState({
      redirect: false
    });
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  async onSelectClick(id) {
    await this.props.setCurrentRoutine(id);
    await this.props.getSegments(id);
    await this.setStateAsync({
      redirect: true
    });
  }

  render() {
    if (this.state.redirect == true) {
      return <Redirect push to="/routine" />;
    }
    return (
      <Fragment>
        <div className="d-flex justify-content-sm-center py-2">
          <h2 className="text-center pt-2"> {this.props.auth.user.username}'s Routines</h2>
        </div>
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
                <td>NYI</td>
                <td>{routine.plays}</td>
                <td>
                  <button
                    onClick={() => {
                      this.onSelectClick(routine.id);
                    }}
                    ref={bt => {
                      this.selectButt = bt;
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    Select
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      this.props.deleteRoutine(routine.id);
                    }}
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
  routines: state.routines.routines,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getRoutines,
  deleteRoutine,
  setCurrentRoutine,
  getSegments
})(Routines);
