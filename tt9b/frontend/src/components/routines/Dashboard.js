import React, { Fragment } from "react";
import Form from "./Form";
import Routines from "./Routines";
import Segments from "./Segments";
import { GET_SEGMENTS } from "../../actions/types";

export default function Dashboard() {
  return (
    <Fragment>
      <Form />
      <Routines />
      <Segments />
    </Fragment>
  );
}
