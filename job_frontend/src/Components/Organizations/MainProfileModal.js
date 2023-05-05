import React, { useState } from "react";
import { useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import { gender, profilepic } from "../../data";
import { updateUserProfile } from "../../network/agent";

const MainProfileModal = ({ show, onHide, profile, updateProfileHandler }) => {
  const [data, setData] = useState({
    companyName: profile.companyName,
    industry: profile.industry,
    specialties: profile.specialties,
    website: profile.website,
  });

  const [error, setError] = useState(false);
  useEffect(() => {
    setData({
      ...data,
      companyName: profile.companyName,
      industry: profile.industry,
      specialties: profile.specialties,
      website: profile.website,
    });
  }, [profile]);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onFormSubmit = () => {
    if (!data.companyName || !data.industry || !data.specialties || !data.website) {
      setError(true);
      return;
    }

    updateUserProfile(JSON.stringify(data)).then((response) => {
      setData({});
      updateProfileHandler(response.data);
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
          Main Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="justify-content-evenly">
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>
                  companyName <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="companyName"
                  type="text"
                  placeholder="Enter companyName"
                  value={data.companyName}
                  onChange={onChangeHandler}
                />
                {!data.companyName && error && (
                  <Form.Text className="text-danger">
                    Fields cannot be empty
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>
                industry<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="industry"
                  type="text"
                  placeholder="Enter type of industry"
                  value={data.industry}
                  onChange={onChangeHandler}
                />
                {!data.industry && error && (
                  <Form.Text className="text-danger">
                    Fields cannot be empty
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            

            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>
                specialties<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                as="textarea"
                  type="text"
                  name="specialties"
                  row={2}
                  placeholder="specialties of organization"
                  value={data.specialties}
                  onChange={onChangeHandler}
                />
                {!data.specialties && error && (
                  <Form.Text className="text-danger">
                    Fields cannot be empty
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>
                website<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control

                  type="text"
                  name="website"
                  placeholder="Enter your website"
                  value={data.website}
                  onChange={onChangeHandler}
                />
                {!data.website && error && (
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

export default MainProfileModal;
