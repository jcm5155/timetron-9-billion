import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Splits from "./Splits";
import { formatDisplay } from "../../utils/SharedFunctions";

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
      timerInstance: null,
      splitTimes: []
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
  startStopClick(e) {
    if (this.state.timerRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  // Resets component state
  async resetClick(e) {
    if (this.state.timerInstance) {
      clearInterval(this.state.timerInstance);
    }
    await this.setStateAsync({
      timerRunning: false,
      timeElapsed: null,
      timerInstance: null,
      timeFrom: null,
      splitTimes: []
    });
    this.displayHours.innerHTML = "00";
    this.displayMinutes.innerHTML = "00";
    this.displaySeconds.innerHTML = "00";
    this.displayMilliseconds.innerHTML = "00";
  }

  // Starts the timer
  async startTimer() {
    let tempTimeElapsed = this.state.timeElapsed;
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

  // Stores split times in component state
  splitClick() {
    if (this.state.timerRunning) {
      const split = moment.duration(
        moment()
          .add(this.state.timeElapsed)
          .diff(this.state.timeFrom)
      );
      this.setState(prevState => ({
        splitTimes: [split, ...prevState.splitTimes]
      }));
    }
  }

  // Displays current time
  async displayTime() {
    let currentTime = moment.duration(
      moment()
        .add(this.state.timeElapsed)
        .diff(this.state.timeFrom)
    );
    this.displayMilliseconds.innerHTML = formatDisplay(currentTime, "ms");
    this.displaySeconds.innerHTML = formatDisplay(currentTime, "s");
    this.displayMinutes.innerHTML = formatDisplay(currentTime, "m");
    this.displayHours.innerHTML = formatDisplay(currentTime, "h");
  }

  render() {
    return (
      <Fragment>
        <div className="d-flex justify-content-sm-center">
          <div className="d-flex flex-row">
            <div className="p-2">
              <h1
                className="display-1"
                ref={dh => {
                  this.displayHours = dh;
                }}
              ></h1>
            </div>
            <div className="p-2">
              <h1 className="display-1">:</h1>
            </div>
            <div className="p-2">
              <h1
                className="display-1"
                ref={dm => {
                  this.displayMinutes = dm;
                }}
              ></h1>
            </div>
            <div className="p-2">
              <h1 className="display-1">:</h1>
            </div>
            <div className="p-2">
              <h1
                className="display-1"
                ref={ds => {
                  this.displaySeconds = ds;
                }}
              ></h1>
            </div>
            <div className="p-2">
              <h1 className="display-1">:</h1>
            </div>
            <div className="p-2">
              <h1
                className="display-1"
                ref={dms => {
                  this.displayMilliseconds = dms;
                }}
              ></h1>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-sm-center mb-3">
          <button
            className="btn btn-primary mx-2"
            onClick={() => {
              this.startStopClick();
            }}
          >
            {" "}
            Start/Stop
          </button>
          <button
            className="btn btn-secondary mx-2"
            onClick={() => {
              this.resetClick();
            }}
          >
            {" "}
            Reset
          </button>
          <button
            className="btn btn-info mx-2"
            onClick={() => {
              this.splitClick();
            }}
          >
            {" "}
            Split
          </button>
        </div>
        <Splits splitTimes={this.state.splitTimes} />
      </Fragment>
    );
  }
}

export default Stopwatch;
