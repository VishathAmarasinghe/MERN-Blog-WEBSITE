import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SinglePost.css";
import singlepostImage from "././articalImage.jpg";
import axios from "axios";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const [post, setpost] = useState({});
  const [updateValue, setUpdateValue] = useState(false);
  const [updateDesc, setupdateDesc] = useState("");
  const [updatetitle, setUpdateTitle] = useState("");
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { user } = useContext(Context);
  const ImageFile = "https://mern-blog-website-umber.vercel.app/images/";
  // console.log(post.username,"   ",user.username)

  useEffect(() => {
    const getPost = async () => {
      const result = await axios.get(`/posts/${path}`);
      console.log(result);
      setpost(result.data);
      setupdateDesc(result.data.description);
      setUpdateTitle(result.data.title);
    };
    getPost();
  }, [path]);

  const handelDelete = () => {
    try {
      axios.delete("/posts/" + path, { data: { username: user.username } });
      window.location.replace("/");
    } catch (error) {}
  };

  const updateCurrentPost = async () => {
    try {
      await axios.put("/posts/" + path, {
        username: user.username,
        description: updateDesc,
        title: updatetitle,
      });
      console.log("post updated");
      window.location.replace("/post/" + path);
    } catch (error) {
      console.log("update error occured");
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img
            src={ImageFile + post.photo}
            alt=""
            className="singlePostImg"
          ></img>
        )}
        {updateValue ? (
          <input
            type="text"
            value={updatetitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
            className="postUpdate titledesc"
          ></input>
        ) : (
          <h1 className="singlePostTitle">
            {post.title}

            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-solid fa-user-pen"
                  onClick={() => setUpdateValue(true)}
                ></i>
                <i
                  className="singlePostIcon fa-solid fa-trash-can"
                  onClick={handelDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author: {"     "}
            <Link className="link" to={`/?user=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </span>

          <span className="singlePostAuthor">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateValue ? (
          <textarea
            onChange={(e) => setupdateDesc(e.target.value)}
            value={updateDesc}
            className="postUpdate abc"
          ></textarea>
        ) : (
          <p className="singlePostDesc desc">{post.description}</p>
        )}
        <br></br>
        {updateValue ? (
          <button onClick={updateCurrentPost} className="updateButton">
            Update Post
          </button>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
