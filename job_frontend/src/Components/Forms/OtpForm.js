import React, { useState ,useEffect} from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { validateOtp,getUserData,getOtp } from "../../network/agent";
import { useGlobalContext } from "../../context";
import PasswordModal from "./Recovery/PasswordModal";

const OtpForm = ({ show, onHide, reset }) => {
  const { setMessage } = useGlobalContext();
  const navigate = useNavigate();
  const [showOtp,setShowOtp] = useState(reset);
  const [val,setVal] = useState(reset);
  const [modal,setModal] = useState({
    email:'',
    show:false
  });

  useEffect(( ) => {
    setShowOtp(reset);
  },[reset])
  const [data, setData] = useState({
    email: "",
    otp: "",
  });

  const [error, setError] = useState(false);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitFormHandler = () => {
    
    if (showOtp === true && val === true) {
      if(!data.email) {
        setError(true);
        return;
      }

      getUserData({'email':data.email}).then(response => {
        if(response.error === false) {
          getOtp(response.data.id);
          setShowOtp(false);
          setMessage(true, "success","Otp send successfully","Please Check your mail");
        }
      })
      

    } else {
      if (!data.email || !data.otp) {
        setError(true);
        return;
      }
      validateOtp(data).then((response) => {
        if (response.error) {
          setMessage(true, "danger", "Error in Otp Verification", "Please Enter a valid otp of email");
        } else {
          if(val === false) {
            navigate("/auth/login");
          }else{
            setModal({email:data.email,show:true});
            setData({...data,otp:''});
          }
        }
      });
    }
  };

  return (
    <>
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
    >
      <Modal.Header className="text-center" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">OTP Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              Email <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              name="email"
              type="text"
              placeholder="Enter your email"
              value={data.email}
              onChange={onChangeHandler}
            />
            {!data.email && error && (
              <Form.Text className="text-danger">
                Fields cannot be empty
              </Form.Text>
            )}
          </Form.Group>

          {!showOtp && <Form.Group className="mb-3">
            <Form.Label>
              Otp <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              name="otp"
              type="text"
              placeholder="Enter otp"
              value={data.otp}
              onChange={onChangeHandler}
            />
            {!data.otp && error && (
              <Form.Text className="text-danger">
                Fields cannot be empty
              </Form.Text>
            )}
          </Form.Group>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={submitFormHandler}>
          {showOtp ? 'Send Otp':'Verify'}
        </Button>
      </Modal.Footer>
    </Modal>
    {modal && <PasswordModal show={modal.show} onHide={()=> {
      setModal({email:'',show:false})
      onHide();
      }} email={modal.email} />}
    </>
  );
};

export default OtpForm;
