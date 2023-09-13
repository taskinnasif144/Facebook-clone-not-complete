import React, { useState, useEffect } from "react";
import "./TimePassedSince.css";

function TimePassedSince({ timestamp }) {
  const [timePassed, setTimePassed] = useState("");

  useEffect(() => {
    const currentTime = new Date();
    const pastTime = new Date(timestamp);

    const timeDiffInSeconds = Math.floor((currentTime - pastTime) / 1000);

    let timePassedString = "";

    if (timeDiffInSeconds < 60) {
      timePassedString = `${timeDiffInSeconds} seconds ago`;
    } else if (timeDiffInSeconds < 3600) {
      const minutes = Math.floor(timeDiffInSeconds / 60);
      timePassedString = `${minutes} ${
        minutes === 1 ? "minute" : "minutes"
      } ago`;
    } else if (timeDiffInSeconds < 86400) {
      const hours = Math.floor(timeDiffInSeconds / 3600);
      timePassedString = `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else {
      const days = Math.floor(timeDiffInSeconds / 86400);
      timePassedString = `${days} ${days === 1 ? "day" : "days"} ago`;
    }

    setTimePassed(timePassedString);
  }, [timestamp]);

  return <div className="timestamp">{timePassed}</div>;
}

export default TimePassedSince;
