import React, { Component } from "react";
import { formatTime } from "../../utils/SharedFunctions";

export class Splits extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Split</th>
              <th>Lap</th>
            </tr>
          </thead>
          <tbody>
            {this.props.splitTimes.map(split => {
              return this.props.splitTimes.indexOf(split) ==
                this.props.splitTimes.length - 1 ? (
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
                        this.props.splitTimes[this.props.splitTimes.indexOf(split) + 1].as(
                          "seconds"
                        )
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Splits;
