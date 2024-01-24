import React from "react";
import Posts from "../components/AllPosts";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styles from "./TabsAccount.module.css";
import CreatePost from "../components/CreatePost";
import ProfileList from "../components/ProfileList";
import MyProfile from "../components/MyProfile";
const TabsAccount = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="feed"
        id="uncontrolled-tab-example"
        className={styles.tabsContainer}
      >
        <Tab eventKey="feed" title="Feed">
          <CreatePost />
          <Posts />
        </Tab>
        <Tab eventKey="profiles" title="Profiles">
          <ProfileList />
        </Tab>
        <Tab eventKey="myProfile" title="Your profile">
          <MyProfile />
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabsAccount;
