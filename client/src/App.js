import "./App.css";

import Signup from "./component/Signup";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Signup from "./component/Signup";
import Login from "./component/Login";
import Home from "./component/Home";
import EditProfile from "./component/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>

        <Route path="signup" element={<Signup />}></Route>

        <Route path="home" element={<Home />}></Route>

        <Route path="edit" element={<EditProfile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
