import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import SegmentRow from "./SegmentRow";

const SegmentContainer = styled.div`
  padding: 3px;
  height: 60vh;
  overflow: scroll;
  -webkit-transition: height 0.3s;
  transition: height 0.3s;

  &:hover {
    height: 70vh;
  }
`;

const SegmentList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: #fdf6e3;
`;

// Droppable component for time segment rearrangement
export class RoutineColumn extends Component {
  render() {
    return (
      <Fragment>
        <SegmentContainer>
          <Droppable droppableId={this.props.current_routine.id.toString()}>
            {(provided, snapshot) => (
              <SegmentList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {this.props.segments.map((segment, index) => (
                  <SegmentRow key={segment.id} segment={segment} index={index} />
                ))}
                {provided.placeholder}
              </SegmentList>
            )}
          </Droppable>
        </SegmentContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  current_routine: state.routines.current_routine,
  segments: state.segments.segments
});

export default connect(mapStateToProps)(RoutineColumn);
