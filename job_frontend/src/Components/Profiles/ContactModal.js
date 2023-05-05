import React, { useState } from "react";
import { useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import { gender, profilepic } from "../../data";
import { updateUserProfile,getContact,updateContact} from "../../network/agent";

const ContactModal = ({ show, onHide,updateProfileHandler }) => {
  const [contact,setContact] = useState({});


  useEffect(() => {
    getContact().then(response => setContact(response.data))
  },[])
  const [error, setError] = useState(false);

  const onChangeHandler = (e) => {

    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onFormSubmit = () => {
    for(let i in contact) {
      if(!contact[i]) {
        setError(true);
        return;
      }
    }

    updateContact(contact).then(response => {
        onHide();
    });

  };
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
          Contact Info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="justify-content-evenly">
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Country <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="country"
                  type="text"
                  placeholder="Enter Country"
                  value={contact.country}
                  onChange={onChangeHandler}
                />
                {!contact.country && error && (
                  <Form.Text className="text-danger">
                    Fields cannot be empty
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>
                  City <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="city"
                  type="text"
                  placeholder="Enter city"
                  value={contact.city}
                  onChange={onChangeHandler}
                />
                {!contact.city && error && (
                  <Form.Text className="text-danger">
                    Fields cannot be empty
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Birth Day <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="birthDay"
                  type="text"
                  placeholder="Enter birthDay"
                  value={contact.birthDay}
                  onChange={onChangeHandler}
                />
                {!contact.birthDay && error && (
                  <Form.Text className="text-danger">
                    Fields cannot be empty
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Birth Month <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="birthMonth"
                  type="text"
                  placeholder="Enter birthMonth"
                  value={contact.birthMonth}
                  onChange={onChangeHandler}
                />
                {!contact.birthMonth && error && (
                  <Form.Text className="text-danger">
                    Fields cannot be empty
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Phone Country Code <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="phoneCountryCode"
                  type="text"
                  placeholder="Enter phone Country Code"
                  value={contact.phoneCountryCode}
                  onChange={onChangeHandler}
                />
                {!contact.phoneCountryCode && error && (
                  <Form.Text className="text-danger">
                    Fields cannot be empty
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Phone <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="mobile"
                  type="text"
                  placeholder="Enter address"
                  value={contact.mobile}
                  onChange={onChangeHandler}
                />
                {!contact.mobile && error && (
                  <Form.Text className="text-danger">
                    Fields cannot be empty
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={10}>
              <Form.Group className="mb-3">
                <Form.Label>
                  address <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="address"
                  type="text"
                  as="textarea"
                  row={3}
                  placeholder="Enter address"
                  value={contact.address}
                  onChange={onChangeHandler}
                />
                {!contact.address && error && (
                  <Form.Text className="text-danger">
                    Fields cannot be empty
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            
            
            
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
        <Button variant="info" type="update" onClick={onFormSubmit}>
          update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactModal;
