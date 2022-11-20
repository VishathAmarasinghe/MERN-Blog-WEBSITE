import React, { useContext, useState } from 'react'
import Sidebar from '../../components/sidebar/sidebar';
import { Context } from '../../context/Context';
import './settings.css';
import axios from 'axios';

export default function Settings() {
  const {user,dispatch} =useContext(Context);
  const [updateUserName,setUpdateUserName]=useState(user.username);
  const [updateEmail,setUpdateEmail]=useState(user.email);
  const [updatePassword,SetUpdatePassword]=useState("");
  const [file, setFile] = useState(null);
  const [updateStatus,setUpdateStatus]=useState(false);
  const PF = "http://localhost:5000/images/";

  const handleUpdateUSer=async(e)=>{
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    let filename="";
    try{
      if (file) {
      const data =new FormData();
      filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    const response=await axios.put('/users/'+user._id,{
      userId: user._id,
      username:updateUserName,
      email:updateEmail,
      password:updatePassword,
      profilePic:filename
    });
    console.log(response);
    setUpdateStatus(true);
    dispatch({ type: "UPDATE_SUCCESS",payload:response.data });
    console.log("updated Sccesssfully");
  }catch(error){
    console.log("getting error",error);
    dispatch({ type: "UPDATE_FAILURE" });
  }
  }
  
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleUpdateUSer} >
          <label>Profile Picture</label>
          <div className="settingsPP">
          {console.log("inside  "+`${PF}${user.profilePic}`)}
            <img
              
              src={file ? URL.createObjectURL(file) : `${PF}${user.profilePic}`}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input value={updateUserName} onChange={(e)=>setUpdateUserName(e.target.value)} type="text" placeholder="enter your new userName" name="name" />
          <label>Email</label>
          <input value={updateEmail} type="email" onChange={(e)=>setUpdateEmail(e.target.value)} placeholder="developer@gmail.com" name="email" />
          <label>Password</label>
          <input value={updatePassword} type="password" onChange={(e)=>SetUpdatePassword(e.target.value)} placeholder="Password" name="password" />
          <button className="settingsSubmitButton"  type="submit">
            Update
          </button>
          {updateStatus ?<p style={{color:"green",textAlign:"center"}}>User Updated Successfully</p>:<p></p>}
        </form>
      </div>
      <Sidebar />
    </div>
  )
}
