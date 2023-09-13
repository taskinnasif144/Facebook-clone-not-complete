import React from "react";
import "./About.css";
import { useState } from "react";
import EditBio from "./EditBio";
import AddHomeIcon from "@mui/icons-material/AddHome";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import NetworkCheckOutlinedIcon from "@mui/icons-material/NetworkCheckOutlined";
import EditBioOption from "./EditBioOption";

function About({ userInfo }) {
  const [edit, setEdit] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const HandleEditBio = () => {
    setEdit(!edit);
  };
  return (
    <div className="about">
      <div className="about__title">Intro</div>
      {edit ? (
        <EditBio handleEditBio={HandleEditBio} />
      ) : (
        <div className="about__bio">
          <span>{userInfo.bio}</span>
          <button onClick={HandleEditBio} className="about__bio__btn">
            Edit Bio
          </button>
        </div>
      )}

      <div className="about__details">
        <div className="about__detail">
          <AddHomeIcon className="about__detial__icon" />{" "}
          <span>Lives in Dhaka Bangladesh</span>
        </div>
        <div className="about__detail">
          <LocationOnIcon className="about__detial__icon" />{" "}
          <span>From Dhaka Bangladesh</span>
        </div>
        <div className="about__detail">
          <FavoriteIcon className="about__detial__icon" /> <span>single</span>
        </div>
        <div className="about__detail">
          <AlarmOnIcon className="about__detial__icon" /> <span>Joined </span>
        </div>
        <div className="about__detail">
          <NetworkCheckOutlinedIcon className="about__detial__icon" />{" "}
          <span>Followed By</span>
        </div>
      </div>

      <EditBioOption />

      <div className="about__edit__details">
        <button
          onClick={() => {
            setEditBio(true);
          }}
          className="about__edit__details__btn">
          Edit Details
        </button>
      </div>
    </div>
  );
}

export default About;
