import React from "react";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SingleProfile from "./pages/SingleProfile";
import SinglePost from "./pages/SinglePost";
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
