import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import { formatTime, totalTime } from "../../utils/SharedFunctions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { toggleTimer, updateRoutine } from "../../actions/routines";

const ProgressBar = styled.div`
  position: relative;
  height: 28px;
  width: 100%;
  border-radius: 25px;
  border: 1px solid #333;
  margin-top: 10px;
`;

const OverallProgressBarFiller = styled.div`
  background: #8b9b9d;
  height: 100%;
  border-radius: inherit;
`;

const CurrentProgressBarFiller = styled.div`
  background: #3f97d7;
  height: 100%;
  border-radius: inherit;
`;

const MainDisplay = styled.div`
  font-size: 8em;
`;

// This is the main component with all of the timer logic for "/routine"
export class TimeDisplay extends Component {
  constructor(props) {
    super(props);

    // I have both a component state boolean (this.state.timerRunning) and an application
    // state boolean (state.timer_running) to represent if a timer is currently running.
    // I did this because the application state boolean wasn't cooperating/updating fast enough for some
    // operations that needed to be done in sequence. I will fix this and use only the application state boolean in the future.

    this.state = {
      timerRunning: false,
      timerIndex: 0,
      timerTarget: null,
      timerInstance: null,
      timerLeft: null,
      totalElapsed: 0,
      currentSegment: { name: "Add a segment to your routine!", duration: "0" },
      previousSegment: { name: "", duration: "0" },
      nextSegment: { name: "", duration: "0" },
      currentPlays: 0,
      disableControlButtons: true
    };

    // I've looked into some other ways of binding these functions, but everything I found didn't seem
    // to look/perform much better. I will refactor this if I find something that is definitely better.
    this.startStopClick = this.startStopClick.bind(this);
    this.previousClick = this.previousClick.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.runTimer = this.runTimer.bind(this);
    this.displayTime = this.displayTime.bind(this);
    this.setStateAsync = this.setStateAsync.bind(this);
    this.timerComplete = this.timerComplete.bind(this);
    this.nextSegment = this.nextSegment.bind(this);
  }

  static propTypes = {
    current_routine: PropTypes.object.isRequired,
    segments: PropTypes.array.isRequired,
    toggleTimer: PropTypes.func.isRequired,
    updateRoutine: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.resetClick();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.resetClick();
    }
  }

  async componentWillUnmount() {
    clearInterval(this.state.timerInstance);
    this.props.toggleTimer(false);

    const newOrderString = this.props.segments.map(seg => seg.id).toString();

    await this.props.updateRoutine({
      ...this.props.current_routine,
      plays: this.props.current_routine.plays + this.state.currentPlays,
      order: newOrderString
    });
  }

  // This is kind of a hack-y workaround so that I can await component state changes.
  // Some async operations need to be done in a specific sequence or else they won't work, so this is my best solution for that.
  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  // Handler for the start/stop button
  startStopClick(e) {
    if (!this.state.disableControlButtons) {
      if (this.props.segments.length > 0) {
        if (this.state.timerRunning) {
          this.stopTimer();
        } else {
          this.startTimer();
        }
      }
    }
  }

  // Handler for the reset button
  resetClick(e) {
    if (this.state.timerInstance) {
      clearInterval(this.state.timerInstance);
      this.props.toggleTimer(false);
    }
    if (this.props.segments.length > 0) {
      this.resetTimer();
    }
  }

  // Handler for the previous segment button
  async previousClick(e) {
    if (!this.state.disableControlButtons) {
      if (this.state.timerIndex > 0) {
        this.stopTimer();
        const newIndex = this.state.timerIndex - 1;
        let newTimeElapsed = 0;

        if (newIndex != 0) {
          newTimeElapsed = this.props.segments
            .slice(0, newIndex)
            .map(curr => curr.duration)
            .reduce((accum, curr) => accum + curr);
        }

        await this.setStateAsync({
          timerLeft: this.props.segments[newIndex].duration,
          totalElapsed: newTimeElapsed,
          timerIndex: newIndex,
          currentSegment: this.props.segments[newIndex],
          previousSegment:
            newIndex == 0 ? { name: "", duration: "0" } : this.props.segments[newIndex - 1],
          nextSegment: this.props.segments[newIndex + 1]
        });
        this.startStopClick();
      }
    }
  }

  // Handler for the next segment button
  async nextClick(e) {
    if (!this.state.disableControlButtons) {
      if (this.state.timerIndex < this.props.segments.length - 1) {
        this.stopTimer();
        this.nextSegment();
      }
    }
  }

  // Resets the timedisplay/state of the routine to its initial state
  async resetTimer() {
    const firstSeg = this.props.segments[0];
    await this.setStateAsync({
      timerRunning: false,
      timerIndex: 0,
      timerTarget: moment(),
      timerInstance: null,
      timerLeft: firstSeg.duration,
      totalElapsed: 0,
      currentSegment: firstSeg,
      nextSegment:
        this.props.segments.length > 1 ? this.props.segments[1] : { name: "", duration: "0" },
      previousSegment: { name: "", duration: "0" },
      disableControlButtons: false
    });
    let currentTime = moment.duration(firstSeg.duration, "s");
    this.mainTimeDisplay.innerHTML = formatTime(currentTime, "main");

    this.elapsedDisplay.innerHTML = `00s / ${formatTime(
      moment.duration(totalTime(this.props.segments), "s"),
      "secondary"
    )}`;

    this.currentProgressBar.style.width = "0";
    this.overallProgressBar.style.width = "0";
  }

  // Starts the timer
  async startTimer() {
    // This has to be awaited because runTimer() needs an accurate timerTarget to display the correct time
    await this.setStateAsync({
      timerTarget: moment().add(this.state.timerLeft, "s", true)
    });
    const timerInstance = setInterval(this.runTimer, 32);
    // Need to set timerInstance here to have a reference for clearInterval() later
    this.setState({
      timerInstance: timerInstance,
      timerRunning: true
    });
    this.props.toggleTimer(true);
  }

  // Stops the timer
  stopTimer() {
    let tempTimeLeft = this.state.timerTarget.diff(moment(), "s", true);
    clearInterval(this.state.timerInstance);
    this.setState({
      timerLeft: tempTimeLeft,
      timerRunning: false
    });
    this.props.toggleTimer(false);
  }

  // Conditionals to be checked every interval
  runTimer() {
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

  // Displays the current time
  displayTime() {
    const currentTime = moment.duration(this.state.timerTarget.diff(moment()));
    // I write directly to the HTML in a few places in this function. From what I understand, this
    // may be in conflict with some of React's design principles, but state changes don't happen
    // quickly/consistently enough for what I'm trying to display here.

    this.mainTimeDisplay.innerHTML = formatTime(currentTime, "main");

    const totalElapsed = moment.duration(
      this.state.totalElapsed + this.state.currentSegment.duration - currentTime.as("seconds"),
      "s"
    );

    this.elapsedDisplay.innerHTML = `${formatTime(totalElapsed, "secondary")} / ${formatTime(
      moment.duration(totalTime(this.props.segments), "s"),
      "secondary"
    )}`;

    this.currentProgressBar.style.width = `${((this.state.currentSegment.duration -
      currentTime.as("seconds")) /
      this.state.currentSegment.duration) *
      100}%`;
    this.overallProgressBar.style.width = `${(totalElapsed.as("seconds") /
      totalTime(this.props.segments)) *
      100}%`;
  }

  // Proceeds to the next segment in the routine
  async nextSegment() {
    const nextSegment = this.props.segments[this.state.timerIndex + 1];
    const newIndex = this.state.timerIndex + 1;
    await this.setStateAsync({
      totalElapsed:
        this.state.totalElapsed + this.props.segments[this.state.timerIndex].duration,
      timerIndex: newIndex,
      timerLeft: nextSegment.duration,
      currentSegment: nextSegment,
      nextSegment:
        newIndex == this.props.segments.length - 1
          ? { name: "", duration: "0" }
          : this.props.segments[newIndex + 1],
      previousSegment: this.props.segments[newIndex - 1]
    });
    this.startStopClick();
  }

  // Displays when the routine is complete
  timerComplete() {
    this.setState({
      currentSegment: { name: "Job's Done!", duration: "0" },
      nextSegment: { name: "🎉", duration: "0" },
      previousSegment: { name: "🎉", duration: "0" },
      totalElapsed: totalTime(this.props.segments),
      currentPlays: this.state.currentPlays + 1,
      disableControlButtons: true
    });
    this.mainTimeDisplay.innerHTML = "TT:9B:GG:EZ";
    this.elapsedDisplay.innerHTML = "(⌐■_■)";
  }

  // The main display, total elapsed time display, and the current/overall progress bars are
  // all included below (rather than as their own components in a separate file) because they
  // all need to be updated extremely quickly. I found it was faster/more reliable to just
  // write directly to their innerHTML rather than pass some piece of state to them.
  render() {
    return (
      <Fragment>
        <Container style={{ textAlign: "center" }}>
          <Row>
            <Col style={{ marginTop: 20 }}>
              <h1 style={{ fontSize: "1.5em" }}>{this.state.previousSegment.name}</h1>
            </Col>
            <Col style={{ marginTop: 20 }}>
              <h1 style={{ fontSize: "3em" }}>{this.state.currentSegment.name}</h1>
            </Col>
            <Col style={{ marginTop: 20 }}>
              <h1 style={{ fontSize: "1.5em" }}>{this.state.nextSegment.name}</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <MainDisplay
                ref={dt => {
                  this.mainTimeDisplay = dt;
                }}
              >
                00:00:00.00
              </MainDisplay>
            </Col>
          </Row>

          <Row>
            <Col>
              <h1
                ref={s => {
                  this.elapsedDisplay = s;
                }}
              ></h1>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                variant={"info"}
                disabled={this.state.timerIndex == 0 || this.state.disableControlButtons}
                style={{ margin: 4 }}
                onClick={() => {
                  this.previousClick();
                }}
              >
                {" << "}
              </Button>
              <Button
                variant={"primary"}
                disabled={this.state.disableControlButtons}
                style={{ margin: 4 }}
                onClick={() => {
                  this.startStopClick();
                }}
              >
                {" "}
                Start/Stop
              </Button>
              <Button
                variant={this.state.disableControlButtons ? "warning" : "success"}
                style={{ margin: 4 }}
                onClick={() => {
                  this.resetClick();
                }}
              >
                {" "}
                Reset
              </Button>
              <Button
                variant={"info"}
                disabled={
                  this.state.timerIndex == this.props.segments.length - 1 ||
                  this.state.disableControlButtons
                }
                style={{ margin: 4 }}
                onClick={() => {
                  this.nextClick();
                }}
              >
                {" "}
                >>
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <ProgressBar>
                <CurrentProgressBarFiller
                  ref={pB => {
                    this.currentProgressBar = pB;
                  }}
                />
              </ProgressBar>

              <ProgressBar>
                <OverallProgressBarFiller
                  ref={pb => {
                    this.overallProgressBar = pb;
                  }}
                />
              </ProgressBar>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  current_routine: state.routines.current_routine,
  segments: state.segments.segments
});

export default connect(mapStateToProps, {
  toggleTimer,
  updateRoutine
})(TimeDisplay);
