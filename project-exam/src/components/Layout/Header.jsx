import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Logout from "../Logout/Logout";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand className={styles.brandLogo}>Safebook</Navbar.Brand>
          <Logout />
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
