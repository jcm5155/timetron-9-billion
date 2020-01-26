import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getSegments, deleteSegment, addSegment } from "../../../actions/segments";
import { updateRoutine } from "../../../actions/routines";

import { DragDropContext } from "react-beautiful-dnd";
import RoutineColumn from "./RoutineColumn";
import { sortSegmentsByOrder } from "../../../utils/SharedFunctions";

export class Segments extends Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.state = {
      segments: this.props.segments
    };
  }
  static propTypes = {
    current_routine: PropTypes.object.isRequired,
    segments: PropTypes.array.isRequired
  };

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  async onDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const newOrderArr = this.state.segments.map(segment => segment.id);
    newOrderArr.splice(source.index, 1);
    newOrderArr.splice(destination.index, 0, draggableId);
    const newOrderString = newOrderArr.toString();

    const newSegmentOrder = sortSegmentsByOrder(newOrderString, this.state.segments);

    this.props.updateRoutine({
      ...this.props.current_routine,
      order: newOrderString
    });

    this.setState({
      ...this.state,
      segments: newSegmentOrder
    });
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <RoutineColumn
          current_routine={this.props.current_routine}
          segments={this.props.segments}
        />
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  current_routine: state.routines.current_routine,
  segments: state.segments.segments
});

export default connect(mapStateToProps, {
  getSegments,
  deleteSegment,
  addSegment,
  updateRoutine
})(Segments);
