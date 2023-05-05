import React,{useState,useEffect} from "react";
import { Modal ,Button,Form} from "react-bootstrap";
import {updatePreference,addPreference} from "../../../network/agent"
import {useGlobalContext} from "../../../context"

const PreferenceModal = ({show,onHide,updateHandler,data,update,addHandler}) => {
  const [title,setTitle] = useState('');
  const {profile} = useGlobalContext();
  console.log(data)

  useEffect(() => {
    if(update) {
      setTitle(data.title);
    }
  },[data.title])

  
  const submitFormHandler = (e) => {
    updatePreference(data.id,{
      title:title
    }).then(response => updateHandler(response.data));
  }

  const addPreferenceHandler = ()=> {
    addPreference({title:title,user:profile.id}).then(response => addHandler(response.data))
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
    >
      <Modal.Header className="text-center" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">preference</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group className="mb-3">
            <Form.Control
              name="skill"
              type="text"
              placeholder="Enter job Preference"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />
            {/* {!contact.country && error && (
                  <Form.Text className="text-danger">
                    Fields cannot be empty
                  </Form.Text>
                )} */}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {update && <Button variant="info" onClick={submitFormHandler}>
          update
        </Button>}

        {!update && <Button variant="info" onClick={addPreferenceHandler}>Add</Button>}
        
      </Modal.Footer>
    </Modal>
  );
};

export default PreferenceModal;
