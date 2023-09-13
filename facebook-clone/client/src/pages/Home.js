import React from "react";
import "./Home.css";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Contacts from "./components/Contacts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

function Home() {
  const [cookies, setCookies] = useCookies(["AccessToken"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies["AccessToken"]) {
      navigate("/login");
    }
  });

  return (
    <div className="home">
      <Sidebar />
      <Feed />
      <Contacts />
    </div>
  );
}

export default Home;
