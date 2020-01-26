import React, { Component } from "react";

export class ProgressBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="routine-progress-bar">
        <div
          className="routine-progress-bar-filler"
          style={{ width: `${this.props.completion}%` }}
        />
      </div>
    );
  }
}

export default ProgressBar;
