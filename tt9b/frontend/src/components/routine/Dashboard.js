import React, { Fragment } from "react";
import TimeDisplay from "./TimeDisplay";
import Form from "./Form";

export default function Dashboard() {
  return (
    <Fragment>
      <TimeDisplay />
      <Form />
    </Fragment>
  );
}
