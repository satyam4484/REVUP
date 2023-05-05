import React,{useEffect,useState} from 'react'
import {Card,Row,Button,Col} from "react-bootstrap"
import { NavLink } from 'react-router-dom';
import { XSquare,Check2Square } from 'react-bootstrap-icons';
import { getUserJobs } from '../../../network/agent';
const RejectedApplications = ({}) => {

    const [job,setJob] = useState([]);

    useEffect(() => {
      getUserJobs({
        type: "get",
        status: "3",
      }).then((response) => {
        setJob(response.data);
      });
    }, []);
  
  
    return (
      <Col sm={12} xs={12} className="card my-4 my-sm-1">
      {job.length > 0 && (
        <div className="my_div p-3">
          {job.map((item) => {
            return (
              <>
                <div>
                  <NavLink to={`/jobs/${item?.job_detail?.slug}`} className="">{item?.job_detail?.role}</NavLink>
                  <h6>{item?.job_detail?.location}</h6>
                  <hr />
                </div>
              </>
            );
          })}
        </div>
      )}
      {job.length === 0 && <h3 className="p-3 text-center">No Applications</h3>}
    </Col>
    );
}

export default RejectedApplications