import React, { Component } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import SegmentRow from "./SegmentRow";

const Title = styled.h3`
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;

const Container = styled.div`
  margin: 8px;
  border: ;
`;

const SegmentList = styled.div`
  padding: 8px;
`;

export class RoutineColumn extends Component {
  render() {
    return (
      <Container>
        <Title>{this.props.current_routine.name}</Title>
        <Droppable droppableId={this.props.current_routine.id.toString()}>
          {provided => (
            <SegmentList ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.segments.map((segment, index) => (
                <SegmentRow key={segment.id} segment={segment} index={index} />
              ))}
              {provided.placeholder}
            </SegmentList>
          )}
        </Droppable>
      </Container>
    );
  }
}

export default RoutineColumn;
