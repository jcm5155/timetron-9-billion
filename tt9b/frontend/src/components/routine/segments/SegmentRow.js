import React, { Component } from "react";
import styled from "styled-components";
import { formatTime } from "../../../utils/SharedFunctions";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? "yellow" : "white")};
`;

const Col = styled.div`
  align-items: center;
`;

const Row = styled.div`
  text-align: center;
`;
export class SegmentRow extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.segment.id.toString()} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Col>
              <Row>{this.props.segment.name}</Row>
              <Row>{formatTime(this.props.segment.duration, 0)}</Row>
            </Col>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default SegmentRow;
