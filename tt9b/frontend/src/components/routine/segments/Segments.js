import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

import { updateSegmentOrder, deleteSegment } from "../../../actions/segments";
import { updateRoutine } from "../../../actions/routines";

import { DragDropContext } from "react-beautiful-dnd";
import RoutineColumn from "./RoutineColumn";
import { sortSegmentsByOrder } from "../../../utils/SharedFunctions";

const DeleteDiv = styled.div`
  margin-top: 10px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  text-align: center;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.isDraggingOver ? "red" : "")};
`;

// Drag and drop rearrangement of time segments for the current routine
export class Segments extends Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragStart = this.onDragStart.bind(this);

    // This boolean controls whether or not the user can currently drag/drop segments.
    this.state = {
      isDragging: false
    };
  }

  static propTypes = {
    current_routine: PropTypes.object.isRequired,
    segments: PropTypes.array.isRequired,
    updateRoutine: PropTypes.func.isRequired,
    updateSegmentOrder: PropTypes.func.isRequired
  };

  onDragStart(result) {
    this.setState({
      isDragging: true
    });
  }

  // Handler for the end of a drag event
  onDragEnd(result) {
    this.setState({
      isDragging: false
    });
    const { destination, source, draggableId } = result;

    // If a draggable was dropped over a valid droppable...
    if (!destination) {
      return;
    }
    // If a draggable was dropped in the same spot as it was before...
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // If a draggable was dropped over the "delete" droppable...
    if (destination.droppableId === "deleteDiv") {
      const filteredOrderArr = this.props.segments.filter(
        segment => segment.id.toString() !== draggableId
      );
      const filteredOrderString = filteredOrderArr.toString();

      this.props.deleteSegment(parseInt(draggableId));

      this.props.updateRoutine({
        ...this.props.current_routine,
        order: filteredOrderString
      });

      this.props.updateSegmentOrder(filteredOrderArr);
    }
    // If a draggable was dropped in the "routine" droppable...
    else {
      const newOrderArr = this.props.segments.map(segment => segment.id);
      newOrderArr.splice(source.index, 1);
      newOrderArr.splice(destination.index, 0, draggableId);
      const newOrderString = newOrderArr.toString();
      const newSegmentOrderArr = sortSegmentsByOrder(newOrderString, this.props.segments);

      this.props.updateRoutine({
        ...this.props.current_routine,
        order: newOrderString
      });

      this.props.updateSegmentOrder(newSegmentOrderArr);
    }
  }

  render() {
    const { isDragging } = this.state;

    return (
      <Fragment>
        <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
          <Droppable droppableId="deleteDiv">
            {(provided, snapshot) => (
              <DeleteDiv
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {provided.placeholder}
                {isDragging ? <h1>🗑️</h1> : <h1>{this.props.current_routine.name}</h1>}
              </DeleteDiv>
            )}
          </Droppable>
          <RoutineColumn />
        </DragDropContext>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  current_routine: state.routines.current_routine,
  segments: state.segments.segments
});

export default connect(mapStateToProps, {
  updateRoutine,
  updateSegmentOrder,
  deleteSegment
})(Segments);
