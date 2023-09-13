import React from "react";
import "./LikeView.css";
import CloseIcon from "@mui/icons-material/Close";
import LikeViewCard from "./LikeViewCard";

function LikeView({ setLikeViewState, likes }) {
  return (
    <div className="likeview">
      <div className="likeview__container">
        <div className="likeveiw__header">
          <div className="likeview__header_option"></div>
          <h2 className="likeview__header_text">Likes</h2>
          <div
            className="likeview__header_opt"
            onClick={() => {
              setLikeViewState(false);
            }}>
            <CloseIcon className="likeview__header_icon" />
          </div>
        </div>

        <div className="likeView__cards">
          {likes.map((like) => {
            return <LikeViewCard uid={like} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default LikeView;
