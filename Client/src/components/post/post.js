import React from "react";
import "./post.css";
import articalImage from "./articalImage.jpg";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const ImageFile = "https://mern-blog-website-umber.vercel.app/images/";
  console.log(ImageFile + post.photo);
  return (
    <div className="post">
      {post.photo && (
        <img className="postImg" src={ImageFile + post.photo} alt="postImage" />
      )}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => {
            return <span className="postcat">{c.name}</span>;
          })}
        </div>
        <Link className="link" to={`/post/${post._id}`}>
          <span className="postTitle">{post.title}</span>
        </Link>

        <hr></hr>
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postdesc">{post.description}</p>
    </div>
  );
}
