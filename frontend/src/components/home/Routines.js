import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { getSegments } from "../../actions/segments";
import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { formatTime } from "../../utils/SharedFunctions";
import moment from "moment";
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
        <Row className="justify-content-center">
          <h2 className="p-2"> {this.props.auth.user.username}'s Routines</h2>
        </Row>
        <Table striped responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Plays</th>
              <th>Segments</th>
              <th>Total Duration</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.routines.map(routine => (
              <tr key={routine.id}>
                <td>{routine.name}</td>
                <td>{routine.plays}</td>
                <td>{routine.order == ("" || ",") ? 0 : routine.order.split(",").length}</td>
                <td>
                  {routine.total_duration == 0
                    ? "0s"
                    : formatTime(moment.duration(routine.total_duration, "s"), "secondary")}
                </td>
                <td>
                  <Button
                    onClick={() => {
                      this.onSelectClick(routine.id);
                    }}
                    ref={bt => {
                      this.selectButt = bt;
                    }}
                    variant={"success"}
                    size={"sm"}
                  >
                    Select
                  </Button>
                  {"  "}
                  <Button
                    onClick={() => {
                      this.props.deleteRoutine(routine.id);
                    }}
                    variant={"danger"}
                    size={"sm"}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
