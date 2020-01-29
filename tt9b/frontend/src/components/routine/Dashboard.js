import React, { Fragment } from "react";
import TimeDisplay from "./TimeDisplay";
import Segments from "./segments/Segments";
import ModalForms from "./ModalForms";

import { Container, Row, Col } from "react-bootstrap";

// Layout for "/routine"
function Dashboard(props) {
  return (
    <Fragment>
      <Container>
        <Row>
          <Col xs={12} md={9} className="align-middle">
            <TimeDisplay />
            <ModalForms />
          </Col>
          <Col xs={6} md={3}>
            <Segments />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Dashboard;
