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
  background-color: ${props => (props.isDraggingOver ? "red" : "#002b36")};
`;

export class Segments extends Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragStart = this.onDragStart.bind(this);

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

  // Drag-n-drop reordering of segments
  onDragEnd(result) {
    this.setState({
      isDragging: false
    });
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (destination.droppableId === "deleteDiv") {
      console.log("this is a deleter boi");
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
    } else {
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
