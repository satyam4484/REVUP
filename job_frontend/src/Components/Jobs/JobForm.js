import React from 'react'
import {Modal,Container,Row,col} from "react-bootstrap"


const JobForm = ({show,onHide}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
    >
      <Modal.Header className="text-center" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          job form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        final image form submi
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  )
}

export default JobForm