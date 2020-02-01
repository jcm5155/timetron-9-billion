import { connect } from "react-redux";
import { Container, Row } from "react-bootstrap";
import { getSegments } from "../../actions/segments";
import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getRoutines,
  deleteRoutine,
  setCurrentRoutine,
  updateRoutine
} from "../../actions/routines";

// Displays all routines associated with current user
export class Routines extends Component {
  constructor(props) {
    super(props);
    this.onSelectClick = this.onSelectClick.bind(this);

    this.state = {
      redirect: false
    };
  }

  static propTypes = {
    routines: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired,
    deleteRoutine: PropTypes.func.isRequired,
    getRoutines: PropTypes.func.isRequired,
    getSegments: PropTypes.func.isRequired,
    setCurrentRoutine: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getRoutines();
  }

  componentWillUnmount() {
    this.setState({
      redirect: false
    });
  }

  // Handler for button that selects a routine to view
  async onSelectClick(id) {
    await this.props.setCurrentRoutine(id);
    await this.props.getSegments(id);

    // This sets the order property for any routine that still has the default order property of ""
    if (this.props.current_routine.order == "" && this.props.segments.length > 0) {
      await this.props.updateRoutine({
        ...this.props.current_routine,
        order: this.props.segments.map(segment => segment.id).join(",")
      });
    }

    // Handles redirect to view a single routine
    this.setState({
      redirect: true
    });
  }

  // TODO: change this styling over to react-bootstrap
  render() {
    if (this.state.redirect == true) {
      return <Redirect push to="/routine" />;
    }
    return (
      <Container>
        <Row className="justify-content-md-center">
          <h2 className="p-2"> {this.props.auth.user.username}'s Routines</h2>
        </Row>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
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
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  routines: state.routines.routines,
  auth: state.auth,
  current_routine: state.routines.current_routine,
  segments: state.segments.segments
});

export default connect(mapStateToProps, {
  getRoutines,
  deleteRoutine,
  setCurrentRoutine,
  getSegments,
  updateRoutine
})(Routines);
