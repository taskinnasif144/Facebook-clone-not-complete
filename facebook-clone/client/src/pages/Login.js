import React, { useEffect } from "react";
import "./Login.css";
import Register from "./components/Register";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux-features/userSlice.js";

function Login() {
  const [state, setState] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies(["AccessToken"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (cookies["AccessToken"]) {
      navigate("/");
    }
  });
  const registerClick = () => {
    setState(true);
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:3001/auth/login", {
      email,
      password,
    });
    if (!response.data.message) {
      const cookie = response.data.token;
      setCookies("AccessToken", cookie);
      window.localStorage.setItem("userID", response.data.userID);
      const userInfo = response.data.user;
      dispatch(
        login({
          name: userInfo.name,
          email: userInfo.email,
          dp: userInfo.dp,
          date: userInfo.date,
          gender: userInfo.gender,
        })
      );
      navigate("/");
    } else {
      alert(response.data.message);
    }
  };
  return (
    <div className="login">
      {state ? <Register setState={setState} /> : ""}
      <div className="login__body">
        <div className="login__body__elements">
          <div className="login__body__element">
            <h1>facebook</h1>
            <span>
              Facebook helps you connect and share with the people in your life.
            </span>
          </div>
          <div className="login__body__element__2">
            <form onSubmit={handleLogIn} className="login__body__element__form">
              <input
                type="text"
                className="login__body__element__input"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="login__body__element__input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="login__body__element__btn">
                Log In
              </button>
            </form>
            <button
              className="login__body__element__register"
              onClick={registerClick}>
              Register
            </button>
          </div>
        </div>
      </div>
      )<div className="login__footer"></div>
    </div>
  );
}

export default Login;
