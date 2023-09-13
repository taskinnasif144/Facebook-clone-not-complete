import "./Feed.css";
import React from "react";
import CreatePost from "./sub-components/CreatePost";
import Posts from "./Posts";
import { useEffect, useState } from "react";
import axios from "axios";
import SyncIcon from "@mui/icons-material/Sync";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/posts/");

        if (res) {
          setPosts(res.data);
        }
      } catch (err) {}
    };
    getAllPosts();
  }, []);

  if (posts.length === 0) {
    return (
      <div className="feed">
        <CreatePost />
        <div className="feed__loading">
          <SyncIcon className="loading" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="feed">
        <CreatePost />
        {posts.map((post) => {
          return <Posts key={post._id} postID={post._id} />;
        })}
      </div>
    );
  }
}

export default Feed;
