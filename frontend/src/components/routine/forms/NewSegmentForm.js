import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateRoutine } from "../../../actions/routines";
import { addSegment, updateSegmentOrder } from "../../../actions/segments";
import { segmentFormSanitizer } from "../../../utils/SharedFunctions";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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

    this.props.addSegment({
      name,
      duration: duration,
      parent: id
    });

    this.setState({
      name: "",
      durationS: "",
      durationM: "",
      durationH: ""
    });
  };

  render() {
    const { name, durationS, durationM, durationH } = this.state;
    return (
      <Fragment>
        <Form onSubmit={this.onSubmit}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" onChange={this.onChange} value={name} />
            </Form.Group>
          </Form.Row>

          <Form.Label>Duration</Form.Label>
          <Form.Group as={Form.Row}>
            <InputGroup as={Col}>
              <input
                className="form-control"
                type="number"
                min="0"
                name="durationH"
                onChange={this.onChange}
                value={durationH}
              />
              <InputGroup.Append>
                <InputGroup.Text>H</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>

            <InputGroup as={Col}>
              <input
                className="form-control"
                type="number"
                min="0"
                name="durationM"
                onChange={this.onChange}
                value={durationM}
              />
              <InputGroup.Append>
                <InputGroup.Text>M</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>

            <InputGroup as={Col}>
              <input
                className="form-control"
                type="number"
                min="0"
                name="durationS"
                onChange={this.onChange}
                value={durationS}
              />
              <InputGroup.Append>
                <InputGroup.Text>S</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Button type="submit" variant="primary" block>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  current_routine: state.routines.current_routine,
  segments: state.segments.segments
});

export default connect(mapStateToProps, { updateSegmentOrder, addSegment, updateRoutine })(
  NewSegmentForm
);
