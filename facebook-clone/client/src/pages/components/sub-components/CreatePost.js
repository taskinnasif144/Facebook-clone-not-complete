import React, { useEffect, useState } from "react";
import "./CreatePost.css";
import { Avatar } from "@mui/material";
import { getStringUntilSpace } from "./hooks/Hooks";
import CaptionBox from "./CaptionBox";
import { useSelector } from "react-redux";
import ImageIcon from "@mui/icons-material/Image";
import ChangePhoto from "./ChangePhoto";

function CreatePost() {
  const [captionBox, setCaptionBox] = useState(false);
  const [imgBox, setImgBox] = useState(false);
  const user = useSelector((state) => state.user.value);
  const [imgType, setImageType] = useState("");

  const captionBoxSwap = () => {
    setCaptionBox(true);
  };

  const imgBoxSwap = (type) => {
    setImageType(type);
    setImgBox(!imgBox);
  };

  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    setFirstName(getStringUntilSpace(user.name));
  }, [user.name]);

  return (
    <div>
      {captionBox ? (
        <CaptionBox setCaptionBox={setCaptionBox} captionBox={captionBox} />
      ) : (
        ""
      )}
      <div className="createpost">
        <div className="createpost__caption">
          <Avatar src={user.dp ? user.dp : ""} />
          <div onClick={captionBoxSwap} className="createpost__input">
            <span>Whats on your mind, {user.name ? firstName : ""}</span>
          </div>
        </div>
        <div className="createpost__imgopt">
          <div className="createPost__addImg" onClick={captionBoxSwap}>
            <ImageIcon className="createpost__imgstyle" />
            <span>Add Image</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
