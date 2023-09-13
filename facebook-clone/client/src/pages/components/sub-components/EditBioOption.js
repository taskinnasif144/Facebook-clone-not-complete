import React from "react";
import "./EditBioOption.css";
import AddHomeIcon from "@mui/icons-material/AddHome";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import NetworkCheckOutlinedIcon from "@mui/icons-material/NetworkCheckOutlined";

function EditBioOption() {
  return (
    <div className="editbioopt">
      <div className="editbioopt__details ">
        <div className="editbioopt__detail">
          <AddHomeIcon className="editbioopt__detial__icon" />{" "}
          <span>Lives in Dhaka Bangladesh</span>
        </div>
        <div className="editbioopt__detail">
          <LocationOnIcon className="editbioopt__detial__icon" />{" "}
          <span>From Dhaka Bangladesh</span>
        </div>
        <div className="editbioopt__detail">
          <FavoriteIcon className="editbioopt__detial__icon" />{" "}
          <span>single</span>
        </div>
        <div className="editbioopt__detail">
          <AlarmOnIcon className="editbioopt__detial__icon" />{" "}
          <span>Joined </span>
        </div>
        <div className="editbioopt__detail">
          <NetworkCheckOutlinedIcon className="editbioopt__detial__icon" />{" "}
          <span>Followed By</span>
        </div>
      </div>
    </div>
  );
}

export default EditBioOption;
