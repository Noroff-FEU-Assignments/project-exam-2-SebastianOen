import React from "react";
import Posts from "../Posts/AllPosts";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styles from "./TabsAccount.module.css";
import CreatePost from "../Posts/CreatePost";
import ProfileList from "../Profiles/ProfileList";
import MyProfile from "../Profiles/MyProfile";

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
