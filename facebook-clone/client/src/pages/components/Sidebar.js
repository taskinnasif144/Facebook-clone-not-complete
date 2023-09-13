import "./Sidebar.css";
import { Link } from "react-router-dom";
import React from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Sidebar() {
  const user = useSelector((state) => state.user.value);
  return (
    <div className="sidebar">
      <Link to={"/friends"} className="sidebar__item__container">
        <div className="sidebar__item">
          <PeopleAltIcon className="sidebar__item__icon" />
          <h2>Friends</h2>
        </div>
      </Link>
      <Link to={"/messenger"} className="sidebar__item__container">
        <div className="sidebar__item">
          <TelegramIcon className="sidebar__item__icon" />
          <h2>Messenger</h2>
        </div>
      </Link>
      <Link to={"/saved"} className="sidebar__item__container">
        <div className="sidebar__item">
          <BookmarkIcon className="sidebar__item__icon" />
          <h2>Saved Posts</h2>
        </div>
      </Link>
      <Link to={"/profile"} className="sidebar__item__container">
        <div className="sidebar__item">
          <Avatar src={user.dp ? user.dp : ""} />
          <h2>{user.name ? user.name : ""}</h2>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
