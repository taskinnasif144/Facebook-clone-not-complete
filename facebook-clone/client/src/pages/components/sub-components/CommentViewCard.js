import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./CommentViewCard.css";
import axios from "axios";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import TimePassedSince from "./hooks/TimePassedSincec";

function CommentViewCard({ id }) {
  const [commentData, setCommentData] = useState({});

  useEffect(() => {
    const getCommentData = async () => {
      const comment = await axios.get(
        `http://localhost:3001/posts/user/comment/get/${id}`
      );
      if (comment.data.message) {
        return;
      }
      if (comment) {
        console.log("comment variable", comment.data);
        setCommentData(comment.data);
      }
    };

    getCommentData();
  }, []);

  if (Object.keys(commentData).length === 0) {
    return (
      <div className="feed__loading">
        <RotateRightIcon className="loading" />{" "}
      </div>
    );
  } else {
    return (
      <div className="CommentViewCard">
        <div className="commentViewCard__upper">
          <Avatar src={commentData.userdp ? commentData.userdp : ""} />
          <div className="commentViewCard__textbox__Container">
            <div className="commentViewCard__textbox">
              <h3>{commentData.username}</h3>
              <span>{commentData.comment}</span>
            </div>
            <TimePassedSince
              timestamp={commentData.created}
              className="CommentViewCard__time"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CommentViewCard;
