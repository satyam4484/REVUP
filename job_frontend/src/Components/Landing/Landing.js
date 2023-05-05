import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
// var __html = require("../../REV/index-2.html");

const Landing = () => {
  const navigate  = useNavigate();
  useEffect(() => {
    navigate("/jobs")
  },[])
  return (  
    <div>Landing</div>
  )
}

export default Landing;