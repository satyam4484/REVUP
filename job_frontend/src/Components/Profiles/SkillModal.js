import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { addUserSkills } from "../../network/agent";

const SkillModal = ({ show, onHide,addSkill }) => {
  const [skill, setSkill] = useState("");
  const onFormSubmit = () => {
    addUserSkills({
      skills: [
        {
          name: skill.charAt(0).toUpperCase() + skill.slice(1),
        },
      ],
    }).then((response) => addSkill(response.data));
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
        <Modal.Title id="contained-modal-title-vcenter">Skills</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              name="skill"
              type="text"
              placeholder="Enter Skill"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            />
            {/* {!contact.country && error && (
                  <Form.Text className="text-danger">
                    Fields cannot be empty
                  </Form.Text>
                )} */}
          </Form.Group>
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

export default SkillModal;
