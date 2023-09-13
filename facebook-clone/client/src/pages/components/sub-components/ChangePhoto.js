import React from "react";
import "./ChangePhoto.css";
import axios from "axios";
import { useState } from "react";

function ChangePhoto({ imgType, setState }) {
  const userID = window.localStorage.getItem("userID");
  const [url, setUrl] = useState("");

  const saveImage = async () => {
    if (imgType === "dp") {
      if (url !== "") {
        const res = await axios.put("http://localhost:3001/auth/userDpSet", {
          userID,
          imgUrl: url,
        });
        if (res) {
          console.log(res);
          if (res.data.message === "1") {
            alert("DP set Perfectly");
            window.location.reload(false);
          } else {
            alert("Something Went Wrong, Please try again later");
          }
        }
      }
    }
    if (imgType === "cover") {
      if (url !== "") {
        const res = await axios.put("http://localhost:3001/auth/userCoverSet", {
          userID,
          imgUrl: url,
        });
        if (res) {
          if (res.data.message === "1") {
            alert("Cover set Perfectly");
            window.location.reload(false);
          } else {
            alert("Something Went Wrong, Please try again later");
          }
        }
      }
    }
  };

  return (
    <div className="changephoto">
      <div className="changephoto__input">
        {console.log("image type >>> ", imgType)}
        <span>Paste the Link of your Photo</span>
        <div className="changephoto__input__box">
          <input
            type="text"
            placeholder="http://www.example.com/index.html "
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="changephoto__options">
          <button
            onClick={saveImage}
            className="changephoto__option changephoto__option_primary">
            Save
          </button>
          <button
            onClick={() => setState("done")}
            className="changephoto__option">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePhoto;
