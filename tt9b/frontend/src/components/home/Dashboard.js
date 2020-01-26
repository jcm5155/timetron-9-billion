import React, { Fragment } from "react";
import NewRoutineForm from "./NewRoutineForm";
import Routines from "./Routines";

export default function Dashboard() {
  return (
    <Fragment>
      <Routines />
      <NewRoutineForm />
    </Fragment>
  );
}
