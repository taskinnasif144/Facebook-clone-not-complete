import React, { useEffect, useState } from "react";
import "./Saved.css";
import axios from "axios";
import Posts from "./components/Posts";

function Saved() {
  const userID = window.localStorage.getItem("userID");
  const [postIDs, setPostIDs] = useState([]);

  useEffect(() => {
    const getSavedPost = async () => {
      const res = await axios.get(
        `http://localhost:3001/posts/user/savedPosts/${userID}`
      );
      if (res) {
        setPostIDs(res.data.saved);
      }
    };

    getSavedPost();
  }, []);

  if (postIDs.length === 0) {
    return <div className="noSave">No Saved Posts Yet</div>;
  } else {
    return (
      <div className="saved">
        {postIDs.map((postID) => {
          return (
            <div className="saved__container">
              {" "}
              <Posts key={postID} postID={postID} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Saved;
