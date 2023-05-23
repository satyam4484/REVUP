import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BriefcaseFill, Bookmark } from "react-bootstrap-icons";
import { useLocation, useNavigate,NavLink } from "react-router-dom";
import { getJobs, checkJobApplied, jobsQuery } from "../../network/agent";
import { useGlobalContext } from "../../context";
import JobForm from "./JobForm";

const JobDetails = () => {
  const [job, setJob] = useState({}); 
  const location = useLocation();
  const { isLoggedIn, profile, user } = useGlobalContext();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const id = location.pathname.split("-").slice(-1)[0];
    getJobs(0, id).then((response) => setJob(response.data));
    checkJobApplied(id).then((response) => {
      if (response.error == true) {
        setApplied(true);
      }
    });
  }, []);

  const applyJobHandler = () => { 
    if (isLoggedIn === false) {
      navigate("/auth/login");
    } else {
      jobsQuery({
        user_id: profile.id,
        job_id: location.pathname.split("-").slice(-1)[0],
        type: "add",
      }).then((response) => {
        if (response.error === false) {
          setApplied(true);
        }
      });
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={11} sm={11} md={10} className="card rounded my-3">
            <Card.Title className="fs-2 mt-3 mb-2 ms-md-5 ms-3 fw-bold text-underline">
              {job.role}
            </Card.Title>
            <Card.Body className="ms-md-3 ms-1">
              <h3 className="mb-3">
                <NavLink to={`/jobs/organization=${job.company?.companyName}`} > {job.company?.companyName}</NavLink> . 
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
              {user.usertype !=2 && (
                <>
                <hr />

                {applied && (
                  <Button className="mt-2" variant="success">
                    Applied
                  </Button>
                )}
                {!applied && (
                  <Button
                    className="mt-2"
                    variant="info"
                    onClick={applyJobHandler}
                  >
                    Apply
                  </Button>
                )}
                </>
              )}
              
              {/* <span className="mt-3 mx-2"><Bookmark size="25"/></span> */}
            </Card.Body>
          </Col>
        </Row>
      </Container>
      {/* {modal && <JobForm show={modal} onHide={() => setModal(false)} />} */}
    </>
  );
};
export default JobDetails;
