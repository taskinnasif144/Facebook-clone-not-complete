import React from "react";
import { useState } from "react";
import "./EditBio.css";
import axios from "axios";

function EditBio({ handleEditBio }) {
  const [bio, setBio] = useState("");
  const userID = window.localStorage.getItem("userID");

  const saveBio = async () => {
    try {
      const res = await axios.put("http://localhost:3001/auth/userBioSet", {
        userID,
        bio,
      });
      if (res) {
        alert(res.data.message);
      }
      window.location.reload(false);
    } catch (e) {}
  };

  return (
    <div className="Edit__bio">
      <textarea
        value={bio}
        id=""
        className="edit__bio__input"
        onChange={(e) => setBio(e.target.value)}></textarea>
      <div className="edit__bio__btns">
        <button onClick={saveBio} className="edit__bio__btn edit__bio__primary">
          Save
        </button>
        <button onClick={handleEditBio} className="edit__bio__btn">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditBio;
