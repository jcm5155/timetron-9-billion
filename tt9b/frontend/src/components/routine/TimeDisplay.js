import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { formatDisplay, formatTime, totalTime } from "../../utils/SharedFunctions";
import PropTypes from "prop-types";

export class TimeDisplay extends Component {
  constructor(props) {
    super(props);

    this.startStopClick = this.startStopClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.runTimer = this.runTimer.bind(this);
    this.displayTime = this.displayTime.bind(this);
    this.setStateAsync = this.setStateAsync.bind(this);
    this.timerComplete = this.timerComplete.bind(this);
    this.nextSegment = this.nextSegment.bind(this);

    this.state = {
      timerRunning: false,
      timerIndex: 0,
      timerTarget: null,
      timerInstance: null,
      timerLeft: null,
      totalElapsed: 0,
      currentSegment: { name: "Add a timer to your routine!", duration: "0" }
    };
  }

  componentDidMount() {
    this.resetClick();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
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
    const firstSeg = this.props.segments[0];
    await this.setStateAsync({
      timerRunning: false,
      timerIndex: 0,
      timerTarget: null,
      timerInstance: null,
      timerLeft: firstSeg.duration,
      totalElapsed: 0,
      currentSegment: firstSeg
    });
    let tempTime = moment.duration(firstSeg.duration, "s");
    this.displayMilliseconds.innerHTML = formatDisplay(tempTime, "ms");
    this.displaySeconds.innerHTML = formatDisplay(tempTime, "s");
    this.displayMinutes.innerHTML = formatDisplay(tempTime, "m");
    this.displayHours.innerHTML = formatDisplay(tempTime, "h");

    this.elapsedDisplay.innerHTML = `00s / ${formatTime(totalTime(this.props.segments), 0)}`;
    this.currentProgressBar.style.width = "0";
    this.overallProgressBar.style.width = "0";
  }

  async startTimer() {
    await this.setStateAsync({
      timerTarget: moment().add(this.state.timerLeft, "s", true)
    });
    let timerInstance = setInterval(this.runTimer, 30);
    this.setState({
      timerInstance: timerInstance,
      timerRunning: true
    });
  }

  async stopTimer() {
    let tempTimeLeft = this.state.timerTarget.diff(moment(), "s", true);
    clearInterval(this.state.timerInstance);
    await this.setStateAsync({
      timerLeft: tempTimeLeft,
      timerRunning: false
    });
  }

  async runTimer() {
    if (this.state.timerTarget.diff(moment()) <= 0) {
      this.stopTimer();
      if (this.state.timerIndex < this.props.segments.length - 1) {
        this.nextSegment();
      } else {
        this.timerComplete();
      }
    } else {
      this.displayTime();
    }
  }

  async displayTime() {
    const currentTime = moment.duration(this.state.timerTarget.diff(moment()));
    this.displayMilliseconds.innerHTML = formatDisplay(currentTime, "ms");
    this.displaySeconds.innerHTML = formatDisplay(currentTime, "s");
    this.displayMinutes.innerHTML = formatDisplay(currentTime, "m");
    this.displayHours.innerHTML = formatDisplay(currentTime, "h");
    const totalElapsed =
      this.state.totalElapsed + this.state.currentSegment.duration - currentTime.as("seconds");

    this.elapsedDisplay.innerHTML = `${formatTime(
      Math.floor(totalElapsed, 1000),
      0
    )} / ${formatTime(totalTime(this.props.segments), 0)}`;
    this.currentProgressBar.style.width = `${((this.state.currentSegment.duration -
      currentTime.as("seconds")) /
      this.state.currentSegment.duration) *
      100}%`;
    this.overallProgressBar.style.width = `${(totalElapsed / totalTime(this.props.segments)) *
      100}%`;
  }

  async nextSegment() {
    let nextSegment = this.props.segments[this.state.timerIndex + 1];
    let nextTimerIndex = this.state.timerIndex + 1;
    await this.setStateAsync({
      totalElapsed:
        this.state.totalElapsed + this.props.segments[this.state.timerIndex].duration,
      currentSegment: nextSegment,
      timerIndex: nextTimerIndex,
      timerLeft: nextSegment.duration
    });
    this.startTimer();
  }

  timerComplete() {
    let tempTime = totalTime(this.props.segments);
    this.setState({
      currentSegment: { name: "Job's Done!", duration: "0" },
      totalElapsed: tempTime
    });
    this.elapsedDisplay.innerHTML = "(⌐■_■)";
    this.displayHours.innerHTML = "TT";
    this.displayMinutes.innerHTML = "9B";
    this.displaySeconds.innerHTML = "GG";
    this.displayMilliseconds.innerHTML = "EZ";
  }

  render() {
    return (
      <Fragment>
        <div className="container text-center pt-2">
          <h1>{this.state.currentSegment.name}</h1>
        </div>
        <div className="d-flex justify-content-sm-center">
          <div className="d-flex flex-row">
            <div>
              <h1
                className="display-1"
                ref={dh => {
                  this.displayHours = dh;
                }}
              >
                00
              </h1>
            </div>
            <div>
              <h1 className="display-1">:</h1>
            </div>
            <div>
              <h1
                className="display-1"
                ref={dm => {
                  this.displayMinutes = dm;
                }}
              >
                00
              </h1>
            </div>
            <div>
              <h1 className="display-1">:</h1>
            </div>
            <div>
              <h1
                className="display-1"
                ref={ds => {
                  this.displaySeconds = ds;
                }}
              >
                00
              </h1>
            </div>
            <div>
              <h1 className="display-1">:</h1>
            </div>
            <div>
              <h1
                className="display-1"
                ref={dms => {
                  this.displayMilliseconds = dms;
                }}
              >
                00
              </h1>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-sm-center">
          <h1
            ref={s => {
              this.elapsedDisplay = s;
            }}
          >
            {}
          </h1>
        </div>

        <div className="d-flex justify-content-sm-center py-3">
          <button
            className="btn btn-primary mr-2"
            onClick={() => {
              this.startStopClick();
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
          >
            {" "}
            Reset
          </button>
        </div>

        <div className="routine-progress-bar">
          <div
            className="routine-progress-bar-filler"
            ref={pB => {
              this.currentProgressBar = pB;
            }}
          />
        </div>

        <div className="routine-progress-bar">
          <div
            className="routine-progress-bar-filler"
            ref={pb => {
              this.overallProgressBar = pb;
            }}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  current_routine: state.routines.current_routine,
  segments: state.segments.segments,
  order: state.routines.current_routine.order
});

export default connect(mapStateToProps, {})(TimeDisplay);
