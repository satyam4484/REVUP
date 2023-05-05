import React, { useEffect, useState } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import { XSquare, Check2Square } from "react-bootstrap-icons";
import { getJobStatus } from "../../../../network/agent";

const SelectedApplications = ({ job_id }) => {
  const [job, setJob] = useState([]);

  useEffect(() => {
    getJobStatus({
      type: "get",
      status: "2",
      job_id: job_id,
    }).then((response) => setJob(response.data));
  }, [job_id]);


  return (
    <Col sm={8} xs={12} className="card my-4 my-sm-1">
      {job.length > 0 && <div className="company_box">
        {job.map((user) => {
          return (
            <>
              <div className="my-1 text-center px-5 py-2 m-2">
                <h6>
                  <b>Name</b> - {user?.user?.firstName} {user?.user?.lastName}
                </h6>
                <h6>
                  <b>Email </b>- {user?.user?.user?.email}
                </h6>
                <a href={user?.user?.resume} target="_blank">
                  View Resume
                </a>
              </div>
              <hr />
            </>
          );
        })}
      </div>}
      {job.length === 0 && <h3 className="p-3 text-center">No Applications</h3>}
    </Col>
  );
};

export default SelectedApplications;
