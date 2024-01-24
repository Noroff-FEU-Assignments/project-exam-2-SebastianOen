import React from "react";

import Login from "../components/Login";
import Register from "../components/Register";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <>
      <h1 className={styles.brandLogo}>Safebook</h1>
      <Tabs
        defaultActiveKey="login"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="login" title="Login">
          <Login />
        </Tab>
        <Tab eventKey="register" title="Register">
          <Register />
        </Tab>
      </Tabs>
    </>
  );
};

export default LoginPage;
