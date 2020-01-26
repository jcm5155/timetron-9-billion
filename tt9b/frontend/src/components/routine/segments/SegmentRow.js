import React, { Component } from "react";
import styled from "styled-components";
import { formatTime } from "../../../utils/SharedFunctions";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

export class SegmentRow extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.segment.id.toString()} index={this.props.index}>
        {provided => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {this.props.segment.name}: {formatTime(this.props.segment.duration, 0)}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default SegmentRow;
