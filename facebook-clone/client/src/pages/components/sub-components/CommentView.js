import React from "react";
import "./CommentView.css";
import CloseIcon from "@mui/icons-material/Close";
import CommentViewCard from "./CommentViewCard";

function CommentView({ setCommentViewState, comments }) {
  return (
    <div className="CommentView">
      <div className="commnetview__container">
        <div className="CommentView__header">
          <div></div>
          <span>Comments</span>

          <div
            onClick={() => {
              setCommentViewState(false);
            }}>
            <CloseIcon />
          </div>
        </div>

        <div className="CommentView__cards">
          {comments.map((comment) => {
            return <CommentViewCard id={comment} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default CommentView;
