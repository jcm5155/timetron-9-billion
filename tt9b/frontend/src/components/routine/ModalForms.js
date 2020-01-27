import React, { useState } from "react";
import NewSegmentForm from "./NewSegmentForm";
import UpdateRoutineForm from "./UpdateRoutineForm";
import { Container, Row, Modal, Button, ButtonToolbar } from "react-bootstrap";

function SegmentForm(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Segment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <NewSegmentForm />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function RoutineForm(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Update Routine</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <UpdateRoutineForm />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalForms(props) {
  const [segmentForm, setSegmentFormShow] = useState(false);
  const [routineForm, setRoutineFormShow] = useState(false);
  return (
    <Container>
      <Row className="justify-content-md-center">
        <ButtonToolbar>
          <Button
            variant="primary"
            style={{ paddingRight: 5 }}
            onClick={() => setSegmentFormShow(true)}
          >
            New Segment
          </Button>
          <SegmentForm show={segmentForm} onHide={() => setSegmentFormShow(false)} />
          <Button
            variant="secondary"
            style={{ paddingLeft: 5 }}
            onClick={() => setRoutineFormShow(true)}
          >
            Rename Routine
          </Button>
          <RoutineForm show={routineForm} onHide={() => setRoutineFormShow(false)} />
        </ButtonToolbar>
      </Row>
    </Container>
  );
}

export default ModalForms;
