import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import { useGlobalContext } from "../../context";
import MainProfileModal from "./MainProfileModal";
import ImageModal from "./ImageModal";
import Jobs from "./Jobs/Jobs";

const Company = () => {
  const { profile, user, updateProfile } = useGlobalContext();
  const [modal, setModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);

  // company forms and modal needs to be added
  const updateProfileHandler = (data) => {
    setModal(false);
    updateProfile(data);
  };

  console.log(profile);
  return (
    <>
      <Container>
        <Row>
          <Col md={10}>
            <Card className="mb-3">
              <Row className="justify-content-evenly">
                <Col xs={10} sm={4} md={3} className="py-3">
                  <img
                    src={profile.companyLogo}
                    className="img-fluid rounded text-center w-75"
                    style={{ cursor: "pointer" }}
                    onClick={() => setImageModal(true)}
                  />
                </Col>
                <Col xs={9} sm={6} md={7} className="py-3">
                  <span>
                    <h3 className="d-inline">{profile.companyName}</h3>{" "}
                    <button
                      className="float-end btn btn"
                      onClick={() => setModal(true)}
                    >
                      <PencilSquare size={20} />
                    </button>
                  </span>
                  <hr />
                  <h6>{profile.industry}</h6>
                  <a href={profile.website} target="_blank">
                    Visit official site
                  </a>
                  <h6 className="mt-3 fw-bold">About Organization</h6>
                  <h6 className="">{profile.specialties}</h6>

                  {/* <button className="btn btn-info my-md-5 my-0"  onClick={()=>setShowResume(true)}>view Resume</button> */}
                </Col>
              </Row>
            </Card>
            
            <Card>
            <Jobs />
            </Card>
          </Col>
            
        </Row>
      </Container>

      {modal && (
        <MainProfileModal
          show={modal}
          onHide={() => setModal(false)}
          profile={profile}
          updateProfileHandler={updateProfileHandler}
        />
      )}

      {imageModal && (
        <ImageModal
          show={imageModal}
          onHide={() => setImageModal(false)}
          profilepic={profile.companyLogo}
        />
      )}
    </>
  );
};

export default Company;
