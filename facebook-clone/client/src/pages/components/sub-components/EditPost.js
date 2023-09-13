import React, { useEffect, useState } from "react";
import "./EditPost.css";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateIcon from "@mui/icons-material/Create";
import axios from "axios";

function EditPost({ postID, setEditState, userOwner }) {
  const userID = window.localStorage.getItem("userID");
  const [saved, setSaved] = useState(false);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    console.log("userOwnder", userOwner === userID);

    if (userOwner === userID) {
      setEditable(true);
    } else {
      setEditable(false);
    }

    const isPostSaved = async () => {
      const res = await axios.get(
        `http://localhost:3001/posts/user/isPostSaved/${postID}/${userID}`
      );

      if (res) {
        if (res.data.message === "1") {
          setSaved(true);
        } else {
          setSaved(false);
        }
      }
    };
    isPostSaved();
  });

  const deletePost = async () => {
    await axios
      .delete(`http://localhost:3001/posts/delete/${postID}/${userID}`)
      .then((res) => {
        alert(res.data.message);
        window.location.reload(false);
      });
  };

  const savePost = async () => {
    const res = await axios.put(
      "http://localhost:3001/posts/user/shuffleSavedPost",
      {
        userID,
        postID,
      }
    );

    if (res) {
      if (res.data.message === "1") {
        alert("Post Saved");
      } else {
        alert("Post removed from saved");
      }
      setEditState(false);
    }
  };

  return (
    <div className="editpost">
      <div onClick={savePost} className="editpost__options">
        {saved ? (
          <BookmarkRemoveIcon className="editpost__icon" />
        ) : (
          <BookmarkAddIcon className="editpost__icon" />
        )}
        <div className="editpost__option__text">
          <h4>{saved ? "Unsave Post" : "Save Post"}</h4>
          <span>
            {saved
              ? "Remove this from your saved items"
              : "Add this to your saved items"}
          </span>
        </div>
      </div>
      {editable ? (
        <div className="editpost__options">
          <CreateIcon className="editpost__icon" />
          <div className="editpost__option__text">
            <h4>Edit Post</h4>
            <span>Add this to your saved items</span>
          </div>
        </div>
      ) : (
        ""
      )}

      {editable ? (
        <div onClick={deletePost} className="editpost__options">
          <DeleteOutlineIcon className="editpost__icon" />
          <div className="editpost__option__text">
            <h4>Delete Post</h4>
            <span>to remove this post from your profile</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default EditPost;
