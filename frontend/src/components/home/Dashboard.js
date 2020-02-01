import React, { Fragment } from "react";
import NewRoutineForm from "./NewRoutineForm";
import Routines from "./Routines";

// Layout for "/"
export default function Dashboard() {
  return (
    <Fragment>
      <Routines />
      <NewRoutineForm />
    </Fragment>
  );
}
