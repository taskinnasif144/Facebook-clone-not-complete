import React, { useEffect } from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useState } from "react";
import "./CaptionBox.css";
import { Avatar } from "@mui/material";
import { getStringUntilSpace } from "./hooks/Hooks";
import axios from "axios";
import { useSelector } from "react-redux";

function CaptionBox({ setCaptionBox }) {
  const [firstName, setFirstName] = useState("");
  const user = useSelector((state) => state.user.value);
  useEffect(() => {
    setFirstName(getStringUntilSpace(user.name));
  }, [user.name]);

  const [caption, setCaption] = useState("");
  const [img, setImg] = useState("");

  const createCaption = async () => {
    if (caption === "" && img === "") {
      return null;
    }
    try {
      await axios
        .post("http://localhost:3001/posts/create", {
          userID: window.localStorage.getItem("userID"),
          caption: caption,
          image: img,
        })
        .then((res) => console.log(res));
      setCaptionBox(false);
      alert("Post Created");
    } catch (error) {
      console.error(error);
    }
    window.location.reload(false);
  };

  return (
    <div className="captionBox__parent">
      <div className="captionBox">
        <div className="captionBox__upper">
          <div className="emptydiv"></div>
          <span>Create Post</span>
          <div onClick={() => setCaptionBox(false)}>
            <ClearRoundedIcon />
          </div>
        </div>
        <div className="captionBoxInfo">
          <Avatar
            style={{
              boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.3)",
            }}
            src={user.dp ? user.dp : ""}
          />
          <span>{user.name ? user.name : ""}</span>
        </div>
        <div className="captionBox__main">
          <textarea
            className="captionBox__textBox"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder={`Whats on your mind, ${user.name ? firstName : ""}?`}
          />
        </div>
        <div className="captionBox__imgurl">
          <input
            type="text"
            placeholder="http://www.example.com/index.html "
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>
        <button
          onClick={createCaption}
          className={`caption__post__btn ${
            !caption && !img ? "caption__post__btn__dis" : ""
          }`}>
          Post
        </button>
      </div>
    </div>
  );
}

export default CaptionBox;
