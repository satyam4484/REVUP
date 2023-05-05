import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import {addJob} from "../../../network/agent";

const initialJobForm = {
  role: "",
  location: "",
  jobType: "",
  description: "",
  skillSet:"",
}


const JobModal = ({ show, onHide,addNewJobs}) => {
  const [data, setData] = useState(initialJobForm);

  const [error, setError] = useState(false);

  const onChangeHandler = (e) => {
    setData({...data,[e.target.name]:e.target.value})
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if(!data.role || !data.location || !data.jobType || !data.skillSet) {
        setError(true);
        return;
    }
    const sk = data.skillSet.split(",");
    const skills = []
    for(let i=0;i<sk.length;i++) {
      skills.push({"name":sk[i]})
    }
    addJob({
      role:data.role,
      location:data.location,
      jobType:data.jobType,
      description:data.description,
      skillSet:skills,
      usersApplied:[]
    }).then(response => {
      setData(initialJobForm);
      addNewJobs(response.data);
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
          Post Job Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="justify-content-evenly">
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Job Role <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="role"
                  type="text"
                  placeholder="Enter Role"
                  value={data.role}
                  onChange={onChangeHandler}
                />
                {!data.role && error && (
                  <Form.Text className="text-danger">
                    Fields cannot be empty
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>
                  location <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="location"
                  type="text"
                  placeholder="Enter Location"
                  value={data.location}
                  onChange={onChangeHandler}
                />
                {!data.location && error && (
                  <Form.Text className="text-danger">
                    Fields cannot be empty
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Job Type <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="jobType"
                  type="text"
                  placeholder="Enter Type of job"
                  value={data.jobType}
                  onChange={onChangeHandler}
                />
                {!data.jobType && error && (
                  <Form.Text className="text-danger">
                    Fields cannot be empty
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Skills <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="skillSet"
                  type="text"
                  placeholder="Enter skills in comma separated"
                  value={data.skillSet}
                  onChange={onChangeHandler}
                />
                {!data.skillSet && error && (
                  <Form.Text className="text-danger">
                    Fields cannot be empty
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={11}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Job Description <span className="text-danger">*</span>
                </Form.Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={data.description}
                  // onReady={ editor => {
                  //     // You can store the "editor" and use when it is needed.
                  //     console.log( 'Editor is ready to use!', editor );
                  // } }
                  onChange={(event, editor) => {
                    setData({...data,description:editor.getData()})
                  }}
                  // onBlur={ ( event, editor ) => {
                  //     console.log( 'Blur.', editor );
                  // } }
                  // onFocus={ ( event, editor ) => {
                  //     console.log( 'Focus.', editor );
                  // } }
                />
                {!data.description && error && (
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
        <Button variant="success" type="submit" onClick={onFormSubmit}>
        Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default JobModal;
