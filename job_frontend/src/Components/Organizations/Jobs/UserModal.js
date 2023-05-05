import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";

const UserModal = ({ show, onHide,data}) => {
  

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
    >
      <Modal.Header className="text-center" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Post Job Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
          Update
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
