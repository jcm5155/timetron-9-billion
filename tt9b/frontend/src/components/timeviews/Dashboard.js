import React, { Fragment } from "react";
import Segments from "./Segments";
import TimeDisplay from "./TimeDisplay";
import Form from "./Form";

export default function Dashboard() {
  return (
    <Fragment>
      <TimeDisplay />
      <Segments />
      <Form />
    </Fragment>
  );
}
