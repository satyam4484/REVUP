import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { getJobs } from "../../network/agent";
import { useGlobalContext } from "../../context";

const Jobs = () => {
  const [job, setJobs] = useState([]);
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const { toggleSpin, isLoading, isLoggedIn,search,setSearch } = useGlobalContext();
  useEffect(() => {
    if (isLoggedIn == false) {
      navigate("/auth/login");
    } else {
      getJobs(offset,0,search)
        .then((response) => {
          setJobs((prev) => [...response.data]);
          toggleSpin(false);
        })
        .catch((error) => console.log(error));
    }

  }, [offset,search]);

  const handleInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight - 100
      ) {
        // toggleSpin(true);
        setOffset((prev) => prev + 4);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    <>
      <Container>
        <Row className="justify-content-evenly mt-md-4">
          <Col md={4} sm={4}  className="card my-md-2 my-3 p-4">
            <Card.Title className="my-3 fw-bold fs-2 text-center"> <u>Search Jobs</u></Card.Title>
            <hr/>
            <Form className="d-flex mx-2">
                <Form.Control
                  type="search"
                  placeholder="Search by role"
                  className="me-2"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>

          </Col>
          {/* need to add loop */}
          <Col md={7} sm={7} className="company_box" id="jb_bx">
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
                          <NavLink to={`/jobs/organization=${item.company.companyName}`}>{item.company.companyName}</NavLink> , {item.location}
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
    </>
  );
};

export default Jobs;
