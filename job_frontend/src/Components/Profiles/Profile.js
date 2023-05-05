import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useGlobalContext } from "../../context";
import { PencilSquare,X } from "react-bootstrap-icons";
import { getUserSkills,removeUserSkills } from "../../network/agent";
import MainProfileModal from "./MainProfileModal";
import ImageModal from "./ImageModal";
import ViewResume from "./ViewResume";
import ContactModal from "./ContactModal";
import SkillModal from "./SkillModal";
import UserJobs from "./UserJobs";

const Profile = () => {
  const { profile, updateProfile } = useGlobalContext();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [skills, setSkills] = useState([]);
  const [skillmodal, setskillModal] = useState(false);
  useEffect(() => {
    if (
      Object.keys(profile).length > 0 &&
      (!profile.firstName || !profile.lastName)
    ) {
      setModal(true);
    }
  }, []);

  
  useEffect(() => {
    getUserSkills().then((response) => setSkills(response.data));
  }, []);

  const updateProfileHandler = (data) => {
    setModal(false);
    updateProfile(data);
  };

  const addSkillHandler = (data)=>{
    setSkills(data);
    setskillModal(false);
  }

  const removeSkillHandler = (id)=> {
    removeUserSkills(id).then(response=> console.log(response))
    const sk = skills.filter((sk) => sk.id != id);
    setSkills(sk);
  }

  return (
    <>
      <Container>
        <Row>
          <Col md={10}>
            <Card>
              <Row className="justify-content-evenly">
                <Col xs={10} sm={4} md={3} className="py-3">
                  <img
                    src={profile.profilePic}
                    className="img-fluid rounded"
                    style={{ cursor: "pointer" }}
                    onClick={() => setImageModal(true)}
                  />
                </Col>
                <Col xs={9} sm={6} md={7} className="py-3">
                  <span>
                    <h3 className="d-inline">
                      {profile.firstName + " " + profile.lastName}
                    </h3>{" "}
                    <button
                      className="float-end btn btn"
                      onClick={() => setModal(true)}
                    >
                      <PencilSquare size={20} />
                    </button>
                  </span>
                  <hr />
                  <Row>
                    <Col sm={4}>
                      <h6 className="d-inline">{profile.headline}</h6>
                    </Col>

                    <Col>
                      <Button
                        variant="link"
                        className="float-end"
                        onClick={() => setContactModal(true)}
                      >
                        contact details
                      </Button>
                    </Col>
                  </Row>

                  {/* <button className="btn btn-info my-md-5 my-0"  onClick={()=>setShowResume(true)}>view Resume</button> */}
                </Col>
              </Row>
            </Card>

            {/* skills section */}
            <Card className="my-2">
              <Card.Body>
                <Card.Title>
                  Skills{" "}
                  <Button
                    className="float-end"
                    onClick={() => setskillModal(true)}
                  >
                    Add
                  </Button>
                </Card.Title>

                <hr />
                {skills.map((skill) => (
                  <span className="badge fs-6 bg-primary mx-1 px-3 py-2" style={{position:"relative"}} key={skill.name}>
                    {skill.name} <span className="re" onClick={()=>removeSkillHandler(skill.id)}>x</span>
                  </span>
                ))}
              </Card.Body>
            </Card>

            {/* end skill section */}

            {/* user Jobs */}
            <UserJobs/>
            
            {/* end user jobs */}
          </Col>
          <Col sm={12} md={7} lg={6}>
            {showResume && (
              <ViewResume
                show={showResume}
                onHide={() => setShowResume(false)}
                resume={profile.resume}
              />
            )}
          </Col>
        </Row>
      </Container>

      {skillmodal && (
        <SkillModal show={skillmodal} onHide={() => setskillModal(false)} addSkill={addSkillHandler} />
      )}

      {contactModal && (
        <ContactModal
          show={contactModal}
          onHide={() => setContactModal(false)}
        />
      )}

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
          profilepic={profile.profilePic}
        />
      )}
    </>
  );
};

export default Profile;

// websites,skills,contact
