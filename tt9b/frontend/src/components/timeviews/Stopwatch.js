import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";

export class Stopwatch extends Component {
  constructor(props) {
    super(props);

    this.startStopClick = this.startStopClick.bind(this);
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

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  componentDidMount() {
    this.displayHours.innerHTML = "00";
    this.displayMinutes.innerHTML = "00";
    this.displaySeconds.innerHTML = "00";
    this.displayMilliseconds.innerHTML = "000";
  }

  componentWillUnmount() {
    clearInterval(this.state.timerInstance);
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  startStopClick(e) {
    if (this.state.timerRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  async resetClick(e) {
    if (this.state.timerInstance) {
      clearInterval(this.state.timerInstance);
    }
    await this.setStateAsync({
      timerRunning: false,
      timeElapsed: null,
      timerInstance: null,
      timeFrom: null
    });
    this.displayHours.innerHTML = "00";
    this.displayMinutes.innerHTML = "00";
    this.displaySeconds.innerHTML = "00";
    this.displayMilliseconds.innerHTML = "000";
  }

  async startTimer() {
    let tempTimeElapsed = this.state.timeElapsed;
    await this.setStateAsync({
      timeFrom: moment(),
      timerRunning: true
    });

    let timerInstance = setInterval(this.displayTime, 30);

    this.setState({
      timerInstance: timerInstance
    });
  }

  async stopTimer() {
    let tempTimeElapsed = this.state.timeElapsed + moment().diff(this.state.timeFrom);
    await this.setStateAsync({
      timeElapsed: tempTimeElapsed,
      timerRunning: false
    });
    clearInterval(this.state.timerInstance);
  }

  async displayTime() {
    let currentPlusElapsed = moment().add(this.state.timeElapsed);
    let tempTime = moment.duration(currentPlusElapsed.diff(this.state.timeFrom));
    this.displayMilliseconds.innerHTML = tempTime
      .get("milliseconds")
      .toString()
      .padStart(3, "0");
    this.displaySeconds.innerHTML = tempTime
      .get("seconds")
      .toString()
      .padStart(2, "0");
    this.displayMinutes.innerHTML = tempTime
      .get("minutes")
      .toString()
      .padStart(2, "0");
    this.displayHours.innerHTML = tempTime
      .get("hours")
      .toString()
      .padStart(2, "0");
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
            className="btn btn-primary mr-2"
            onClick={() => {
              this.startStopClick();
            }}
            ref={bt => {
              this.startStop = bt;
            }}
          >
            {" "}
            Start/Stop
          </button>
          <button
            className="btn btn-secondary ml-2"
            onClick={() => {
              this.resetClick();
            }}
            ref={bt => {
              this.reset = bt;
            }}
          >
            {" "}
            Reset
          </button>
        </div>
      </Fragment>
    );
  }
}

export default Stopwatch;
