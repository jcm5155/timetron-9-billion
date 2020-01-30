import React, { useState } from "react";
import NewSegmentForm from "./NewSegmentForm";
import UpdateRoutineForm from "./UpdateRoutineForm";
import { Container, Row, Modal, Button, ButtonToolbar } from "react-bootstrap";

// Modal layout for the new segment form
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

// Modal layout for the update routine form
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

// Buttons that show the modal forms
function ModalForms(props) {
  const [segmentForm, setSegmentFormShow] = useState(false);
  const [routineForm, setRoutineFormShow] = useState(false);
  return (
    <Container>
      <Row className="justify-content-md-center" style={{ marginTop: 5 }}>
        <ButtonToolbar>
          <Button
            variant="primary"
            style={{ margin: 5 }}
            onClick={() => setSegmentFormShow(true)}
          >
            New Segment
          </Button>
          <SegmentForm show={segmentForm} onHide={() => setSegmentFormShow(false)} />
          <Button
            variant="secondary"
            style={{ margin: 5 }}
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
