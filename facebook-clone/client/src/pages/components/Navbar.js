import { useState } from "react";
import React from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import TelegramIcon from "@mui/icons-material/Telegram";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar } from "@mui/material";
import Logout from "./sub-components/Logout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function Navbar() {
  const [search, setSearch] = useState("");
  const [logoutMenu, setLogoutMenu] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  const user = useSelector((state) => state.user.value);

  const logoutSwap = () => {
    setLogoutMenu(!logoutMenu);
  };

  return (
    <div className="navbar">
      {logoutMenu ? <Logout /> : ""}
      {isMobile ? (
        <Link to="/">
          <img
            className="navbar__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
            alt="facebook logo"
          />
        </Link>
      ) : (
        <Link to="/">
          <img
            className="navbar__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Facebook_Logo_%282019%29.svg/2560px-Facebook_Logo_%282019%29.svg.png"
            alt="facebook logo"
          />
        </Link>
      )}
      <div className="navbar__search">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search Facebook"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="navbar__function">
        <button className="navbar__function__icon">
          <TelegramIcon className="navbar__function__muicon" />
        </button>
        <button className="navbar__function__icon">
          <NotificationsIcon className="navbar__function__muicon" />
        </button>
        <button onClick={logoutSwap} className="navbar__function__icon">
          <Avatar src={user.dp ? user.dp : ""} />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
