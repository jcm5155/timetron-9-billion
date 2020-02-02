import React, { Component } from "react";
import styled from "styled-components";
import { formatTime } from "../../../utils/SharedFunctions";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import moment from "moment";

// Draggable component for time segment rearrangement
export class SegmentRow extends Component {
  render() {
    const Container = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      border: ${this.props.timer_running ? "1px solid lightgrey" : "1px solid #002b36"};
      border-radius: 2px;
      padding: 8px;
      margin-bottom: 8px;
      background-color: ${props => (props.isDragging ? "lightyellow" : "white")};
    `;

    const Col = styled.div`
      align-items: center;
    `;

    const Row = styled.div`
      text-align: center;
    `;
    return (
      <Draggable
        draggableId={this.props.segment.id.toString()}
        index={this.props.index}
        isDragDisabled={this.props.timer_running}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Col>
              <Row>{this.props.segment.name}</Row>
              <Row>
                {formatTime(moment.duration(this.props.segment.duration, "s"), "secondary", 0)}
              </Row>
            </Col>
          </Container>
        )}
      </Draggable>
    );
  }
}

const mapStateToProps = state => ({
  timer_running: state.routines.timer_running
});

export default connect(mapStateToProps)(SegmentRow);
