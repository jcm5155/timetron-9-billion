import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

export class TimeDisplay extends Component {
  constructor(props) {
    super(props);

    this.startStopClick = this.startStopClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.displayTime = this.displayTime.bind(this);
    this.setStateAsync = this.setStateAsync.bind(this);
    this.timerComplete = this.timerComplete.bind(this);
    this.nextSegment = this.nextSegment.bind(this);

    this.state = {
      timerRunning: false,
      timerIndex: 0,
      timerTarget: null,
      timerInstance: null,
      timerLeft: null
    };
  }

  componentDidMount() {
    if (this.props.segments.length > 0) {
      this.resetClick();
    }
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
    if (this.props.segments.length > 0) {
      this.resetTimer();
    }
  }

  async resetTimer() {
    let firstSeg = this.props.segments[0];
    await this.setStateAsync({
      timerRunning: false,
      timerIndex: 0,
      timerTarget: null,
      timerInstance: null,
      timerLeft: firstSeg.duration
    });
    let tempTime = moment.duration(firstSeg.duration, "s");
    this.displaySegment.innerHTML = firstSeg.name;
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

  async startTimer() {
    let timerTarget = moment().add(this.state.timerLeft, "s");

    await this.setStateAsync({
      timerTarget: timerTarget,
      timerRunning: true
    });

    let timerInstance = setInterval(this.displayTime, 30);

    this.setState({
      timerInstance: timerInstance
    });
  }

  async stopTimer() {
    let tempTimeLeft = this.state.timerTarget.diff(moment(), "s");
    await this.setStateAsync({
      timerLeft: tempTimeLeft,
      timerRunning: false
    });
    clearInterval(this.state.timerInstance);
  }

  async displayTime() {
    if (this.state.timerTarget.diff(moment(), "s") <= 0) {
      this.stopTimer();
      if (this.state.timerIndex < this.props.segments.length - 1) {
        this.nextSegment();
      } else {
        this.timerComplete();
      }
    } else {
      let tempTime = moment.duration(this.state.timerTarget.diff(moment()));
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
  }

  async nextSegment() {
    let nextSegmentTime = this.props.segments[this.state.timerIndex + 1].duration;
    let nextTimerIndex = this.state.timerIndex + 1;
    await this.setStateAsync({
      timerIndex: nextTimerIndex,
      timerLeft: nextSegmentTime
    });
    this.displaySegment.innerHTML = this.props.segments[this.state.timerIndex].name;
    this.startTimer();
  }

  timerComplete() {
    this.displaySegment.innerHTML = "Job's Done!";
    this.displayHours.innerHTML = "TT";
    this.displayMinutes.innerHTML = "9B";
    this.displaySeconds.innerHTML = "XD";
    this.displayMilliseconds.innerHTML = "CY@";
  }

  render() {
    return (
      <Fragment>
        <div className="d-flex justify-content-sm-center mt-2">
          <h3
            ref={ds => {
              this.displaySegment = ds;
            }}
          >
            Add a segment to your routine!
          </h3>
        </div>

        <div className="d-flex justify-content-sm-center">
          <div className="d-flex flex-row">
            <div className="p-2">
              <h1
                className="display-1"
                ref={dh => {
                  this.displayHours = dh;
                }}
              >
                00
              </h1>
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
              >
                00
              </h1>
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
              >
                00
              </h1>
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
              >
                000
              </h1>
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

const mapStateToProps = state => ({
  current_routine: state.routines.current_routine,
  segments: state.segments.segments
});

export default connect(mapStateToProps, {})(TimeDisplay);
