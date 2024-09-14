import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Posts from "../../components/posts/posts";
import Sidebar from "../../components/sidebar/sidebar";
import axios from "axios";
import "./home.css";
import { useLocation } from "react-router-dom";
import api from "../../API";

export default function Home() {
  const [posts, setposts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await api.get(`/posts${search}`);
      console.log("data ", response.data);
      setposts(response.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
