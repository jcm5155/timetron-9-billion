import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Splits from "./Splits";
import styled from "styled-components";
import { setSplit, clearSplits } from "../../actions/stopwatch";
import { formatDisplay } from "../../utils/SharedFunctions";
import { Container, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";

const MainDisplay = styled.div`
  font-size: 8em;
`;

export class Stopwatch extends Component {
  constructor(props) {
    super(props);

    this.startStopClick = this.startStopClick.bind(this);
    this.splitClick = this.splitClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.displayTime = this.displayTime.bind(this);
    this.setStateAsync = this.setStateAsync.bind(this);

    this.state = {
      timerRunning: false,
      timeElapsed: null,
      timeFrom: null,
      timerInstance: null
    };
  }

  componentDidMount() {
    this.resetClick();
  }

  componentWillUnmount() {
    clearInterval(this.state.timerInstance);
  }

  // Needed to allow awaiting for state changes that are required before resuming
  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  // Handler for start/stop button click
  startStopClick() {
    if (this.state.timerRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  // Resets component state
  resetClick() {
    if (this.state.timerInstance) {
      clearInterval(this.state.timerInstance);
    }
    this.props.clearSplits();
    this.setState({
      timerRunning: false,
      timeElapsed: null,
      timerInstance: null,
      timeFrom: null
    });
    this.mainTimeDisplay.innerHTML = "00:00:00:00";
  }

  // Starts the timer
  async startTimer() {
    await this.setStateAsync({
      timeFrom: moment(),
      timerRunning: true
    });
    let timerInstance = setInterval(this.displayTime, 35);
    this.setState({
      timerInstance: timerInstance
    });
  }

  // Stops the timer and stores total time elapsed in component state
  async stopTimer() {
    let tempTimeElapsed = this.state.timeElapsed + moment().diff(this.state.timeFrom);
    await this.setStateAsync({
      timeElapsed: tempTimeElapsed,
      timerRunning: false
    });
    clearInterval(this.state.timerInstance);
  }

  // Stores splits in application state
  splitClick() {
    if (this.state.timerRunning) {
      const split = moment.duration(
        moment()
          .add(this.state.timeElapsed)
          .diff(this.state.timeFrom)
      );
      this.props.setSplit(split);
    }
  }

  // Displays current time
  async displayTime() {
    let currentTime = moment.duration(
      moment()
        .add(this.state.timeElapsed)
        .diff(this.state.timeFrom)
    );
    this.mainTimeDisplay.innerHTML = `
    ${formatDisplay(currentTime, "h")}:${formatDisplay(currentTime, "m")}:${formatDisplay(
      currentTime,
      "s"
    )}:${formatDisplay(currentTime, "ms")}
    `;
  }

  render() {
    return (
      <Fragment>
        <Container style={{ textAlign: "center" }}>
          <Row>
            <Col>
              <MainDisplay
                ref={dt => {
                  this.mainTimeDisplay = dt;
                }}
              >
                00:00:00:00
              </MainDisplay>
            </Col>
          </Row>

          <Button
            variant="primary"
            style={{ margin: 4 }}
            onClick={() => {
              this.startStopClick();
            }}
          >
            {" "}
            Start/Stop
          </Button>
          <Button
            variant="secondary"
            style={{ margin: 4 }}
            onClick={() => {
              this.resetClick();
            }}
          >
            {" "}
            Reset
          </Button>
          <Button
            variant="info"
            style={{ margin: 4 }}
            onClick={() => {
              this.splitClick();
            }}
          >
            {" "}
            Split
          </Button>
        </Container>

        <Splits />
      </Fragment>
    );
  }
}

export default connect(null, {
  setSplit,
  clearSplits
})(Stopwatch);
