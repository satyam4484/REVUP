import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Tab, Tabs } from "react-bootstrap";
import { BriefcaseFill, XSquare } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import { getCompanyJob, jobsQuery } from "../../../network/agent";
import EditJobModal from "./EditJobModal";
import UserModal from "./UserModal";
import Applications from "./Applications/Applications";
import RejectedApplications from "./Applications/RejectedApplications";
import SelectedApplications from "./Applications/SelectedApplications"


const JobDetails = () => {
  const [job, setJob] = useState({});
  const [key, setKey] = useState("one");

  const [edit, setEdit] = useState(false);
  const location = useLocation();

  useEffect(() => {
    getCompanyJob(location.pathname.split("-").slice(-1)[0]).then((response) =>
      setJob(response.data)
    );
  }, []);

  const updateJobHandler = (data) => {
    setJob(data);
    setEdit(false);
  };
  // const removeUserHandler = (id) => {
  //   jobsQuery({
  //     user_id: id,
  //     job_id: job.id,
  //     type: "delete",
  //   }).then((response) => {
  //     if (response.error == false) {
  //       const newUser = job.usersApplied.filter((item) => item.id != id);
  //       setJob({ ...job, usersApplied: newUser });
  //     }
  //   });
  // };

  const setJobIdHandler = () => {
    getCompanyJob(location.pathname.split("-").slice(-1)[0]).then((response) =>
      setJob(response.data)
    );
  }

  return (
    <>
      <Container fluid>
        <Row className="justify-content-evenly">
          <Col sm={10} className="card">
            <Card.Title className="fs-2 mt-3 mb-2 ms-md-5 ms-3 fw-bold text-underline">
              {job.role}{" "}
              <Button
                className="float-end"
                onClick={() => setEdit(true)}
                variant="warning"
              >
                Edit
              </Button>
            </Card.Title>
            <Card.Body className="ms-md-3 ms-1 company_box">
              <h3 className="mb-3">
                {job.company?.companyName} .
                <span className="fs-4">{job.location}</span>
              </h3>
              <h5>
                <BriefcaseFill /> {job.jobType}
              </h5>
              <hr />
              <h3 className="my-2">Preferred Skill</h3>
              {job.skillSet?.map((item) => {
                return (
                  <span className="badge fs-6 bg-primary mx-1" key={item.name}>
                    {item.name}
                  </span>
                );
              })}
              <hr />
              <h3 className="my-2">Description</h3>
              <span
                dangerouslySetInnerHTML={{ __html: job.description }}
                className="my-desc"
              ></span>
              <hr />
            </Card.Body>
          </Col>

          {/* applicatons  */}
          <Col sm={10} md={8}className="mt-5">
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="one" title="Applications">
                <Applications job_id={job.id} setJobIdHandler={setJobIdHandler}/> 
              </Tab>
              <Tab eventKey="two" title="Selected Applications">
                 <SelectedApplications job_id={job.id} /> 
              </Tab>
              <Tab eventKey="Three" title="Rejected Applications">
                 <RejectedApplications job_id={job.id}/> 
              </Tab>
              
            </Tabs>
          </Col>

          {/* <Col sm={4} xs={12} className="card my-4 my-sm-1">
            <Card.Title className="my-2 text-center fw-bold">
              <u>Users Applied</u>
            </Card.Title>
            <hr />
            <div className="company_box">
              {job.usersApplied &&
                job?.usersApplied.map((user) => {
                  return (
                    <>
                      <div className="my-1">
                        <h6>
                          Name - {user.firstName} {user.lastName}
                          <span
                            className="float-end"
                            onClick={() => removeUserHandler(user.id)}
                            style={{ cursor: "pointer" }}
                          >
                            <XSquare color="red" variant="danger" />
                          </span>
                        </h6>
                        <h6>Email- {user?.user.email}</h6>
                        <a href={user.resume} target="_blank">
                          View Resume
                        </a>
                      </div>
                      <hr />
                    </>
                  );
                })}
            </div>
          </Col> */}
        </Row>
      </Container>

      {edit && (
        <EditJobModal
          show={edit}
          onHide={() => setEdit(false)}
          jobdata={job}
          updatejobdata={updateJobHandler}
        />
      )}

      {/* {viewprofile.modal && (
        <UserModal
          show={viewprofile.modal}
          onHide={() => setViewProfile({ modal: false, data: {} })}
        />
      )} */}
    </>
  );
};

export default JobDetails;
