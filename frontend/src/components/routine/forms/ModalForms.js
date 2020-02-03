import React, { useState } from "react";
import { useSelector } from "react-redux";
import NewSegmentForm from "./NewSegmentForm";
import UpdateRoutineForm from "./UpdateRoutineForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

// Modal layout for the new segment form
function SegmentForm(props) {
  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add a Segment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <NewSegmentForm />
        </Container>
      </Modal.Body>
    </Modal>
  );
}

// Modal layout for the update routine form
function RoutineForm(props) {
  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title>Rename Routine</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <UpdateRoutineForm />
        </Container>
      </Modal.Body>
    </Modal>
  );
}

// Buttons that show the modal forms
function ModalForms(props) {
  const timerRunning = useSelector(state => state.routines.timer_running);
  const [segmentForm, setSegmentFormShow] = useState(false);
  const [routineForm, setRoutineFormShow] = useState(false);
  return (
    <Container>
      <Row className="justify-content-md-center" style={{ marginTop: 5 }}>
        <ButtonToolbar>
          <Button
            variant="primary"
            style={{ margin: 5 }}
            onClick={() => (timerRunning ? null : setSegmentFormShow(true))}
            disabled={timerRunning}
          >
            New Segment
          </Button>
          <SegmentForm show={segmentForm} onHide={() => setSegmentFormShow(false)} />
          <Button
            variant="secondary"
            style={{ margin: 5 }}
            onClick={() => (timerRunning ? null : setRoutineFormShow(true))}
            disabled={timerRunning}
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
