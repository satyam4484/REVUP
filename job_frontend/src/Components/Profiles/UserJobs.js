import React,{useState,useEffect} from "react";
import { Card,Tabs,Tab,Col } from "react-bootstrap";
import {getUserJobs} from "../../network/agent";
import Applications from "./Applications/Applications";
import SelectedApplications from "./Applications/SelectedApplications";
import RejectedApplications from "./Applications/RejectedApplications";

const UserJobs = () => {
    const [job,setJobs] = useState([]);
    const [key,setKey] = useState("one");
    useEffect(() => {
        getUserJobs().then(response => setJobs(response.data));
    },[]);

  return (
    <Card className="my-2">
      <Card.Body>
        <Card.Title> Applied Jobs </Card.Title>
        <hr />
        {/* <Col sm={10} md={8}className="mt-5"> */}
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="one" title="Applications">
                <Applications/> 
              </Tab>
              <Tab eventKey="two" title="Selected Applications">
                 <SelectedApplications /> 
              </Tab>
              <Tab eventKey="Three" title="Rejected Applications">
                 <RejectedApplications/> 
              </Tab>
              
            </Tabs>
          {/* </Col> */}
        
        {/* {job.map(item => {
          return (
            
          )
        })} */}
        
      </Card.Body>
    </Card>
  );
};

export default UserJobs;

