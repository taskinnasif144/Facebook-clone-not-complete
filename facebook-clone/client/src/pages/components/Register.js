import React from "react";
import "./Register.css";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import axios from "axios";

function Register({ setState }) {
  const [firstName, setFirstName] = useState("");
  const [surname, setSername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const handleGender = (event) => {
    setGender(event.target.value);
  };
  const formSubmit = async (event) => {
    event.preventDefault();
    const name =
      firstName.charAt(0).toUpperCase() +
      firstName.slice(1) +
      " " +
      surname.charAt(0).toUpperCase() +
      surname.slice(1);
    const date = day + "/" + month + "/" + year;
    try {
      await axios
        .post("http://localhost:3001/auth/register", {
          name,
          email,
          password,
          date,
          gender,
        })
        .then((res) => console.log(res));
      alert("registration done");
    } catch (e) {
      console.error(e);
    }

    setState(false);
  };
  const registerUndo = () => {
    setState(false);
  };
  return (
    <div className="register">
      <div className="register__fields">
        <div className="register__fields__intro">
          <div>
            <h2> SIGN UP</h2>
            <span>Its Quick and Easy!</span>
          </div>
          <button onClick={registerUndo}>
            <ClearIcon />
          </button>
        </div>

        <form className="register__field__input" onSubmit={formSubmit}>
          <div className="inputForName">
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder="First Name"
            />
            <input
              type="text"
              value={surname}
              placeholder="Surname"
              onChange={(e) => setSername(e.target.value)}
            />
          </div>
          <input
            type="email"
            placeholder="New Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="date">Date:</label>
          <div class="date-input">
            <input
              type="number"
              id="date"
              min="1"
              max="31"
              placeholder="Day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
            <input
              type="number"
              min="1"
              max="12"
              placeholder="Month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            <input
              type="number"
              min="1900"
              max="2100"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <label class="gender__label" htmlFor="male">
            Gender:
          </label>
          <div class="gender__input">
            <div>
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={handleGender}
              />
            </div>
            <div>
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={handleGender}
              />
            </div>
          </div>
          <button className="register__form__btn" type="submit">
            Sign Up!
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
