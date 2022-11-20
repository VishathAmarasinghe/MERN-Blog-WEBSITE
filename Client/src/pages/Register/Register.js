import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(false);

  const handleSubmit = async(e)=>{
      e.preventDefault();
      setError(false);
      try{
        const response =await axios.post("/auth/register",{
          username,
          email,
          password
        })
        response.data && window.location.replace("/login")
        console.log(response);
        }catch(err){
          setError(true);
        console.log(err);
      }
    }
      

  return (
    <div className="register">
      <div className='registerborder'>
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input onChange={(e)=>setUsername(e.target.value)} className="registerInput" type="text" placeholder="Enter your username..." />
        <label>Email</label>
        <input onChange={(e)=>setEmail(e.target.value)} className="registerInput" type="text" placeholder="Enter your email..." />
        <label>Password</label>
        <input onChange={(e)=>setPassword(e.target.value)} className="registerInput" type="password" placeholder="Enter your password..." />
        <button className="registerButton">Register</button>
      </form>
      </div>
        <button type='submit' className="registerLoginButton"><Link className='link' to={"/login"}>Login</Link></button>
        {error?<span style={{color:"red",marginTop:"10px"}}>Somthing went Wrong</span>:<span></span>}
    </div>
  )
}
