import React, { useEffect } from "react";
import { Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./Posts.css";
import EditPost from "./sub-components/EditPost";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import axios from "axios";
import { useDispatch } from "react-redux";
import { openImage } from "../../redux-features/openImage";
import { useNavigate } from "react-router-dom";
import SyncIcon from "@mui/icons-material/Sync";
import LikeView from "./sub-components/LikeView";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import CommentView from "./sub-components/CommentView";
import TimePassedSince from "./sub-components/hooks/TimePassedSincec";

function Posts({ postID }) {
  const [post, setPost] = useState({});
  const [likeState, setLikeState] = useState(false);
  const [likes, setLikes] = useState([]);
  const userID = window.localStorage.getItem("userID");
  const [likeCount, setLikeCount] = useState(0);
  const [editState, setEditState] = useState(false);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likeViewState, setLikeViewState] = useState(false);
  const [commentViewState, setCommentViewState] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getPostData = async () => {
      const res = await axios.get(`http://localhost:3001/posts/${postID}`);

      if (res) {
        setPost(res.data);
        const user = await axios.get(
          `http://localhost:3001/auth/getUserInfo/${res.data.userOwner}`
        );
        if (user) {
          setUser(user.data);
        }
        if (res.data.likes.includes(userID)) {
          setLikeState(true);
        } else {
          setLikeState(false);
        }

        setLikeCount(res.data.likes.length);
        setLikes(res.data.likes);
        setComments(res.data.comments);
      }
    };
    getPostData();
  }, []);

  const handleLike = async () => {
    const res = await axios.put("http://localhost:3001/posts/updateLike", {
      postID,
      userID,
    });
    if (res) {
      setLikeState(!likeState);
      likeState ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
    }
  };

  const handleCommentBox = () => {
    setCommentViewState(true);
  };

  const sendComment = async () => {
    if (comment === "") return;
    try {
      const res = await axios.post(
        `http://localhost:3001/posts/user/comment/create/${postID}`,
        {
          text: comment,
          image: "",
          userOwner: userID,
        }
      );

      if (res.data.message === "1") {
        setComment("");
        alert("comment done");
        window.location.reload(false);
      } else {
        alert(
          "Commenting failed, please check your internet connection and try again later"
        );
      }
    } catch (error) {}
  };

  const imageOpen = () => {
    dispatch(
      openImage({
        isOpen: true,
        imageUrl: post.image,
      })
    );
    navigate("/openImage");
  };

  if (Object.keys(post).length === 0) {
    return (
      <div className="feed__loading">
        <SyncIcon className="loading" />
      </div>
    );
  } else {
    return (
      <div className="posts">
        {editState ? (
          <EditPost
            postID={postID}
            setEditState={setEditState}
            userOwner={post.userOwner}
          />
        ) : null}
        {likeViewState ? (
          <LikeView setLikeViewState={setLikeViewState} likes={likes} />
        ) : null}
        {commentViewState ? (
          <CommentView
            setCommentViewState={setCommentViewState}
            comments={comments}
          />
        ) : null}

        <div className="post__header">
          <div className="post__info">
            <Avatar src={user.dp ? user.dp : ""} />
            <div className="post__info__text">
              <h2>{user.name ? user.name : "UserName"}</h2>
              <TimePassedSince timestamp={post.createdAt} />
            </div>
          </div>
          <button onClick={() => setEditState(!editState)}>
            <MoreHorizIcon />
          </button>
        </div>

        <div className="post__body">{post.caption ? post.caption : ""}</div>
        <div className="post__body__img">
          {post.image ? (
            <img onClick={imageOpen} src={post.image} alt="" />
          ) : (
            ""
          )}
        </div>
        <div
          onClick={() => {
            setLikeViewState(true);
          }}
          className="post__likes">
          {likeCount ? likeCount : 0} likes
        </div>

        <div className="post__actions">
          <div className="post__action" onClick={handleLike}>
            {likeState ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            <span>like</span>
          </div>
          <div className="post__action" onClick={handleCommentBox}>
            <ChatBubbleIcon />
            <span>Comments</span>
          </div>
          <div className="post__action">
            <ReplyAllIcon />
            <span>Share</span>
          </div>
        </div>

        <div className="post__commentBox post__commentBox_active">
          <Avatar src={user.dp ? user.dp : ""} />
          <div className="post__commentbox__area">
            <input
              value={comment}
              type="text"
              placeholder="Write a comment"
              onChange={(e) => setComment(e.target.value)}
            />
            <AddPhotoAlternateIcon className="post__commentbox__area__addimg" />
            <SendIcon
              onClick={sendComment}
              className={`post__commentbox__area__addimg  ${
                comment && "post__commentbox__active"
              }`}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
