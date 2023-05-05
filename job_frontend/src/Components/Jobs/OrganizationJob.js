import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {Container,Row,Col,Button,Card} from "react-bootstrap"
import {getJobByOrganization} from "../../network/agent";


const OrganizationJob = () => {
    const location = useLocation();
    const [job,setJobs] = useState([]);
    const navigate = useNavigate();

        useEffect(() => {
        getJobByOrganization({organization:location.pathname.split("=").slice(-1)}).then(response => setJobs(response.data))
    },[])
  return (

    <Container>
        <Row className="justify-content-evenly mt-md-4">
          
          {/* need to add loop */}
          <Col md={10}>
            <h3 className='text-center'><u>Jobs By - {location.pathname.split("=").slice(-1)}</u></h3>
          </Col>
          <Col md={8} sm={8} className="company_box" id="jb_bx">
            <Row >
            {job.map((item) => {
            return (
              <Col xs={11} sm={11} className="card my-md-2 my-1" key={item.role + ""+item.id}>
                <Row className="no-gutters">
                  <Col md={3} xs={3}>
                    <img
                      src={item.company.companyLogo}
                      className="card-img my-3 img-fluid"
                      alt="Card image"
                    />
                  </Col>

                  <Col md={8} xs={8}>
                    <Card.Body>
                      <Button
                        variant="link"
                        onClick={(e) => {
                          navigate(`/jobs/${item.slug}`);
                        }}
                      >
                        <Card.Title className="m-0">{item.role}</Card.Title>{" "}
                        <span className="float-end">{item.posted}</span>
                      </Button>
                      <Card.Text>
                        <p className="m-0">
                          {item.company.companyName}, {item.location}
                        </p>
                        <p className="m-0"></p>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Col>
            );
          })}
            </Row>
          </Col>
          
        </Row>
      </Container>
  )
}

export default OrganizationJob