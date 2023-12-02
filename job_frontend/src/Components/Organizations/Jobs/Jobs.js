import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { NavLink, useLocation } from "react-router-dom";
import { getCompanyJob,deleteJob } from "../../../network/agent";
import { useGlobalContext } from "../../../context";
import JobModal from "./JobModal";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [modal, setModal] = useState(false);
  const { user } = useGlobalContext();
  const location = useLocation();

  console.log(jobs);
  useEffect(() => {
    getCompanyJob().then((response) => setJobs(response.data));
  }, []);

  const addNewJobs = (data) => {
    console.log(data)
    setJobs([data,...jobs]);
    setModal(false);
  }

  const removeJob = (id) => {
    deleteJob(id).then(response => {
      if(response.error === false) {
        const jb = jobs.filter(item => item.id !=id)
        setJobs([...jb]);
      }
    })
  }
  // job detail page in organization need to be implemented with the backend part
  return (
    <>
      <Row className="justify-content-evenly pb-3">
        {/* filters need to be implemented */}
        {/* <Col
        className="my-2"
        xs={{ order: 1, span: 10 }}
        sm={3}
        md={{ order: 2, span: 5 }}
      >
        filter
      </Col> */}

        {/* jobs needs to be implemented */}
        <Col
          className="my-2"
          xs={{ order: 2, span: 10 }}
          sm={10}
          md={{ order: 1, span: 10 }}
        >
          <h4 className="my-2 text-center d-inline">Jobs Posted</h4>
          <Button
            onClick={() => setModal(true)}
            className="float-end"
            variant="info"
          >
            Post Job
          </Button>
          <hr />
          <div className="mydiv ">
            {jobs.map((item) => {
              return (
                <>
                  <div className="mx-2">
                    <NavLink
                      to={`/company/${user.email}/jobsposted/${item.slug}`}
                    >
                      {item.role}
                    </NavLink> 
                    <span className="float-end" style={{cursor: "pointer"}} onClick={() => removeJob(item.id)}><Trash color="red" /></span>
                    <h6>{item.location}</h6>
                  </div>
                  <hr />
                </>
              );
            })}
          </div>
        </Col>
      </Row>
      {modal && <JobModal show={modal} onHide={() => setModal(false)} addNewJobs={addNewJobs} />}
    </>
  );
};

export default Jobs;
