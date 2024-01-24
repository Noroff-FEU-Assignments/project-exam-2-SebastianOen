import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Register from "../components/Register";
import Login from "../components/Login";

const LoginPage = () => {
  return (
    <div>
      <Tabs defaultActiveKey="feed" id="uncontrolled-tab-example">
        <Tab eventKey="feed" title="Feed">
          <Login />
        </Tab>
        <Tab eventKey="register" title="Register">
          <Register />
        </Tab>
      </Tabs>
    </div>
  );
};

export default LoginPage;
