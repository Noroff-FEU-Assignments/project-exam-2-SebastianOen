import React from "react";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SingleProfile from "./Pages/SingleProfile";
import SinglePost from "./Pages/SinglePost";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<SingleProfile />} />
        <Route path="/post" element={<SinglePost />} />
      </Routes>
    </Router>
  );
};

export default App;
