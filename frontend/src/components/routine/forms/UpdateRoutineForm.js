import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateRoutine } from "../../../actions/routines";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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

  render() {
    const { name } = this.state.name;
    return (
      <Fragment>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
              placeholder={this.props.current_routine.name}
            />
          </Form.Group>
          <Form.Group>
            <Button type="submit" variant="primary" block>
              Update
            </Button>
          </Form.Group>
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  current_routine: state.routines.current_routine
});

export default connect(mapStateToProps, { updateRoutine })(UpdateRoutineForm);
