import React, { Component } from "react";
import { formatTime } from "../../utils/SharedFunctions";
import { connect } from "react-redux";
import { Table, Col } from "react-bootstrap";
import PropTypes from "prop-types";

// Displays the lap splits for the stopwatch
export class Splits extends Component {
  static propTypes = {
    splits: PropTypes.array.isRequired
  };
  render() {
    return (
      <Col style={{ marginTop: 15 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Split</th>
              <th>Lap</th>
            </tr>
          </thead>
          <tbody>
            {this.props.splits.map(split => {
              return this.props.splits.indexOf(split) == this.props.splits.length - 1 ? (
                <tr key={split}>
                  <td>{formatTime(split.as("seconds"))}</td>
                  <td> {formatTime(split.as("seconds"))}</td>
                </tr>
              ) : (
                <tr key={split}>
                  <td>{formatTime(split.as("seconds"))}</td>
                  <td>
                    {formatTime(
                      split.as("seconds") -
                        this.props.splits[this.props.splits.indexOf(split) + 1].as("seconds")
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  splits: state.stopwatch.splits
});

export default connect(mapStateToProps)(Splits);
