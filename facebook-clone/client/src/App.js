import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./pages/components/Navbar";
import { useCookies } from "react-cookie";
import Friends from "./pages/Friends";
import Saved from "./pages/Saved";
import Messenger from "./pages/Messenger";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux/es/hooks/useSelector";
import OpenImage from "./pages/components/sub-components/OpenImage";

function App() {
  const [cookies] = useCookies(["AccessToken"]);

  const isImageOpen = useSelector((state) => state.openImage.value.isOpen);
  return (
    <div className="App">
      <Router>
        {cookies["AccessToken"] ? <Navbar /> : ""}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/openImage" element={<OpenImage />} />

          {/* <Route path="/register" element={<Register />}></Route>
          <Route path="/Messeges" element={<Messeges />}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
