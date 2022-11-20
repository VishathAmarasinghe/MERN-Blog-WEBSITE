import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("title Name "+title);
    console.log("description Name "+desc);
    console.log("user Name "+user);
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
    const response=await axios.post('/posts',{
      title:title,
      description:desc,
      username:user.username,
      photo:filename,
    })
    console.log(response);
    window.location.replace("/post/" + response.data._id);
  }catch(error){
    console.log("getting error",error);
  }

    // const newPost = {
    //   username: user.username,
    //   title,
    //   desc,
    // };

    // console.log(newPost);
    // try {
    //   const res=await axios.post("/posts",newPost);
    
    // } catch (err) {
    //   console.log("error occured")
    // }
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}