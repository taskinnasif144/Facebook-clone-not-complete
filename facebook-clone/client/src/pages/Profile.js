import React, { useEffect } from "react";
import "./Profile.css";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import About from "./components/sub-components/About";
import CreatePost from "./components/sub-components/CreatePost";
import ChangePhoto from "./components/sub-components/ChangePhoto";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../redux-features/userSlice";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { openImage } from "../redux-features/openImage";
import Posts from "./components/Posts";

function Profile({ uid }) {
  const [editPhoto, setEditPhoto, removeEditPhoto] = useState("");
  const [imgType, setImageType] = useState("");
  const [editOption, setEditOption] = useState(false);
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies(["AccessToken"]);
  const navigate = useNavigate();

  let userID;
  if (uid) {
    userID = uid;
  } else {
    userID = window.localStorage.getItem("userID");
  }

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (!cookies["AccessToken"]) {
      navigate("/login");
    }
    const getProfileDPandCover = async () => {
      try {
        const user = await axios.get(
          `http://localhost:3001/auth/getUserInfo/${userID}`
        );

        if (user) {
          setUserInfo(user.data);
          if (!uid) {
            dispatch(login(user.data));
          }
        }
      } catch (error) {}
    };

    getProfileDPandCover();
  }, []);

  const editOptionState = (type) => {
    setImageType(type);
    setEditOption(!editOption);
  };

  const coverImageOpen = () => {
    dispatch(
      openImage({
        isOpen: true,
        imageUrl: userInfo.cover,
      })
    );
    navigate("/openImage");
  };
  const dpImageOpen = () => {
    dispatch(
      openImage({
        isOpen: true,
        imageUrl: userInfo.dp,
      })
    );
    navigate("/openImage");
  };

  const dummyCoverUrl =
    "https://computerhistory.org/wp-content/uploads/2019/06/16-9-dummy-image4.jpg";
  const dummyDpUrl =
    "https://web-neta.net/wp-content/uploads/2017/11/dummy_1600x1200-1.png";

  return (
    <div className="profile">
      {editOption && (
        <ChangePhoto imgType={imgType} setState={editOptionState} />
      )}
      <div className="profile__header__container">
        <div className="profile__header">
          <div className="profile__cover_photo">
            <img
              onClick={coverImageOpen}
              src={userInfo.cover ? userInfo.cover : dummyCoverUrl}
              alt="https://dummyimage.com/16:9x1080/"
            />

            <div
              className="profile__cover__change"
              onClick={() => editOptionState("cover")}>
              <CameraAltIcon />
              <span>Change Cover Photo</span>
            </div>
          </div>

          <div className="profile__info__container">
            <div className="profile__info">
              <div className="profile__dp">
                <img
                  onClick={dpImageOpen}
                  src={userInfo.dp ? userInfo.dp : dummyDpUrl}
                  alt=""
                />
                <div
                  onClick={() => editOptionState("dp")}
                  className="profile__dp__change">
                  <CameraAltIcon />
                </div>
              </div>
              <div className="profile__name">
                <h2>Taskin Ahmed Nasif</h2>
                <span>744 friends</span>
              </div>
            </div>
            <div className="profile__options">
              <div className="profile__option profile__primary_color">
                <AddIcon />
                <span>Add to Story</span>
              </div>
              <div className="profile__option">
                <EditIcon />
                <span>Edit Profile</span>
              </div>
            </div>
          </div>
          <div className="profile__header_bottom">
            <div className="profile__bottom__options">
              <div className="profle__bottom__option profile__option__selected">
                posts
              </div>
              <div className="profle__bottom__option">posts</div>
              <div className="profle__bottom__option">posts</div>
              <div className="profle__bottom__option">posts</div>
              <div className="profle__bottom__option">posts</div>
            </div>
            <div className="profile__bottom__options">
              <div className="profle__bottom__option">
                <MoreHorizIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile__body__container__parent">
        <div className="profile__body__container">
          <div className="profile__body">
            <About userInfo={userInfo} />
          </div>
          <div className="profile__body__post">
            <CreatePost />

            {console.log(userInfo.ownPosts)}
            {userInfo.ownPosts
              ? userInfo.ownPosts.map((post) => {
                  console.log(post);
                  return <Posts postID={post} />;
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
