import React, { useEffect, useState } from "react";
import "./LikeViewCard.css";
import { Avatar, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import axios from "axios";
import RotateRightIcon from "@mui/icons-material/RotateRight";

function LikeViewCard({ uid }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await axios.get(
        `http://localhost:3001/auth/getUserInfo/${uid}`
      );
      if (user) {
        setUser(user.data);
      }
    };

    getUserInfo();
  }, []);
  if (Object.keys(user).length === 0) {
    return (
      <div className="feed__loading">
        <RotateRightIcon className="loading" />{" "}
      </div>
    );
  } else {
    return (
      <div className="likeviewcard">
        <Link className="likeviewcard__1">
          <Avatar src={user.dp} />
          <span>{user.name}</span>
        </Link>
        <div className="likeviewcard__2">
          <Button variant="contained" startIcon={<AddIcon />}>
            Add Friend
          </Button>
        </div>
      </div>
    );
  }
}

export default LikeViewCard;
