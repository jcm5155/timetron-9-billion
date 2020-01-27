import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import { formatDisplay, formatTime, totalTime } from "../../utils/SharedFunctions";
import { Container, Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const ProgressBar = styled.div`
  position: relative;
  height: 28px;
  width: 100%;
  border-radius: 25px;
  border: 1px solid #333;
  margin-top: 10px;
`;

const ProgressBarFiller = styled.div`
  background: #1da598;
  height: 100%;
  border-radius: inherit;
`;

const MainDisplay = styled.div`
  font-size: 8em;
`;

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
    this.mainTimeDisplay.innerHTML = `${formatDisplay(tempTime, "h")}:${formatDisplay(
      tempTime,
      "m"
    )}:${formatDisplay(tempTime, "s")}:${formatDisplay(tempTime, "ms")}
    `;

    this.elapsedDisplay.innerHTML = `00s / ${formatTime(totalTime(this.props.segments), 0)}`;
    this.currentProgressBar.style.width = "0";
    this.overallProgressBar.style.width = "0";
  }

  async startTimer() {
    await this.setStateAsync({
      timerTarget: moment().add(this.state.timerLeft, "s", true)
    });
    let timerInstance = setInterval(this.runTimer, 32);
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

    this.mainTimeDisplay.innerHTML = `
    ${formatDisplay(currentTime, "h")}:${formatDisplay(currentTime, "m")}:${formatDisplay(
      currentTime,
      "s"
    )}:${formatDisplay(currentTime, "ms")}
    `;

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

    this.mainTimeDisplay.innerHTML = "TT:9B:GG:EZ";
    this.elapsedDisplay.innerHTML = "(⌐■_■)";
  }

  render() {
    return (
      <Fragment>
        <Container style={{ textAlign: "center" }}>
          <Row>
            <Col>
              <h1>{this.state.currentSegment.name}</h1>
            </Col>
          </Row>
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
              {" "}
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
            </Col>
          </Row>

          <Row>
            <Col>
              <ProgressBar>
                <ProgressBarFiller
                  ref={pB => {
                    this.currentProgressBar = pB;
                  }}
                />
              </ProgressBar>

              <ProgressBar>
                <ProgressBarFiller
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

export default connect(mapStateToProps)(TimeDisplay);
