import React from "react";
import axios from "axios";
import "./Logout.css";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useCookies } from "react-cookie";

function Logout() {
  const user = useSelector((state) => state.user.value);
  const [cookie, setCookie, removeCookie] = useCookies(["AccessToken"]);

  const deleteProfile = async () => {
    const id = window.localStorage.getItem("userID");
    const response = await axios.delete(
      `http://localhost:3001/auth/delete/${id}`
    );

    if (response) {
      alert(response.data.message);
      removeCookie("AccessToken");
      window.localStorage.removeItem("userID");
    }
  };
  const logOut = () => {
    removeCookie("AccessToken");
    window.localStorage.removeItem("userID");
  };

  return (
    <div className="logout">
      <div className="goto_profile">
        <Link to={"/profile"} className="goto__item__container">
          <div className="goto__items">
            <Avatar src={user.dp ? user.dp : ""} />
            <h2>{user.name ? user.name : ""}</h2>
          </div>
        </Link>
      </div>
      <div className="logout__options">
        <div className="logout__option" onClick={deleteProfile}>
          <DeleteForeverRoundedIcon />
          <span>Delete Profile</span>
        </div>
      </div>
      <div className="logout__options">
        <div className="logout__option" onClick={logOut}>
          <LogoutOutlinedIcon />
          <span>Log Out</span>
        </div>
      </div>
    </div>
  );
}

export default Logout;
