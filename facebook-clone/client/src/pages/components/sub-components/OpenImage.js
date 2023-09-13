import React from "react";
import "./OpenImage.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import CancelIcon from "@mui/icons-material/Cancel";

function OpenImage() {
  const image = useSelector((state) => state.openImage.value);

  const closeImage = () => {
    window.history.back();
  };

  if (image.isOpen) {
    return (
      <div className="openImage">
        <div onClick={closeImage} className="openImage__close">
          <CancelIcon className="openImageIcon" />
        </div>

        <div className="openImage__image">
          <img src={image.imageUrl} alt="" />
        </div>
      </div>
    );
  } else {
    return;
  }
}

export default OpenImage;
