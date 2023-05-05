import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card,Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { getJobPreference,removeJobPreference} from "../../../network/agent";
import PreferenceModal from "./PreferenceModal";

const Preferene = () => {
  const [preference, setPreference] = useState([]);
  const [modal,setModal] = useState({
    show:false,
    data:{},
    update:false
  });

  useEffect(() => {
    getJobPreference().then((response) => setPreference(response.data));
  }, []);


  const updateHandler = (data) => {
   
  
    let id = preference.findIndex(item => item.id = data.id);


    if(id!=-1) {
      
      const dt = preference;
      dt[id] = data
      setPreference(dt);
    }
  
    
    setModal({show:false,data:{},update:false})
  }


  const addHandler=(data) => {
    setPreference([...preference,data]);
    setModal({...modal,show:false});
  }
  const removePreference = (id)=>{
    removeJobPreference(id).then(response => {
      if(response.error === false) {
        const pf = preference.filter(item => item.id !=id)
        setPreference(pf);
      }
    });
  }
  return (
    <>
      <Container>
        <Row className="mt-5 justify-content-evenly">
          <Col md={8} className="card">
            <Card.Title className="py-1 my-1 fs-1 fw-bold text-center">
                <u>Job Preferences</u> <Button onClick={() => setModal({...modal,show:true})} className="float-end">Add</Button>
            </Card.Title>
            <hr/>
            <Card.Body>
                <div className="mydiv">
                    {preference.map((item,index) => {
                        return (
                            <div key={item.title}>
                                <h5 style={{cursor:"pointer"}} className="d-inline" onClick={() => setModal({show:true,data:item,update:true})}> {index+1} . <u>{item.title}</u></h5>  <span className="float-end" onClick={()=>removePreference(item.id)}><Trash color="red"/></span>
                                <hr/>
                            </div>
                        )
                    })}
                </div>
            </Card.Body>
          </Col>
        </Row>
      </Container>
      {modal.show && <PreferenceModal show={modal.show} onHide={()=>setModal({...modal,show:false,update:false})} updateHandler={updateHandler} data={modal.data} update={modal.update} addHandler={addHandler} />}
    </>
  );
};

export default Preferene;
