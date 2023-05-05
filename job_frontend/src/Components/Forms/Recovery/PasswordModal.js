import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import {changePassword} from "../../../network/agent";
import { useGlobalContext } from "../../../context";


const PasswordModal = ({ show, onHide, email }) => {

    const {setMessage} = useGlobalContext();

    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    
  const submitFormHandler = () => {
    // if(password.trim().length < 8) {
    //     setError('Password length must be 8');
    //     return;
    // }
    if (!password) {
        setError('password cannot be empty');
        return;
    }
    console.log(email,password);
    changePassword({'email':email,password:password}).then(response => {
        if(response.error === false) {
            setPassword('');
            setMessage(true, "success","Password changed","You may login now");
            onHide();
        }
    });
    
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
    >
      <Modal.Header className="text-center" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">OTP Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              Email <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              name="email"
              type="text"
              placeholder="Enter your email"
                value={email}
                disabled
            />
            {/* {!data.email && error && (
              <Form.Text className="text-danger">
                Fields cannot be empty
              </Form.Text>
            )} */}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              new password <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              name="password"
              type="text"
              placeholder="Enter your password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            {error && (
              <Form.Text className="text-danger">
                {error}
              </Form.Text>
            )}
          </Form.Group>
          
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={submitFormHandler}>
          Reset
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PasswordModal;
