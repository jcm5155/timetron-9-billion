import React, { Fragment } from "react";
import TimeDisplay from "./TimeDisplay";
import Segments from "./segments/Segments";
import NewSegmentForm from "./NewSegmentForm";
import UpdateRoutineForm from "./UpdateRoutineForm";

export default function Dashboard() {
  return (
    <Fragment>
      <TimeDisplay />
      <Segments />
      <NewSegmentForm />
      <UpdateRoutineForm />
    </Fragment>
  );
}
