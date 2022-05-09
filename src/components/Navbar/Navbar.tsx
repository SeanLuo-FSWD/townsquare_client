import { Home } from "@material-ui/icons";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.scss";
import homeIcon from "./home.svg";
import settingsIcon from "./settings.svg";
import usersIcon from "./users.svg";
import chatIcon from "./chat.svg";
import Badge from "@material-ui/core/Badge";
import { LoginContext } from "../../store/context/LoginContext";

function Navbar(props: any) {
  const { setCerror, currentUser } = useContext(LoginContext);

  const getMsgNotice = () => {
    console.log("xxxxxxxxxxxxxxxxxxxxxx");
    console.log(currentUser);

    let display = null;

    if (
      !window.location.pathname.includes("/chatPage") &&
      currentUser.hasMessage
    ) {
      display = "new";
    }

    console.log("displayyyyy");
    console.log(display);

    return display;
  };
  return (
    <div className={`${styles.navBar} flex--navBar`}>
      <div
        className={
          props.currentPath === "/"
            ? `${styles.navBar__item} ${styles.active}`
            : `${styles.navBar__item}`
        }
      >
        <Link to="/">
          <img className={styles.navIcon} src={homeIcon}></img>
        </Link>
      </div>
      <div
        className={
          props.currentPath === "/users"
            ? `${styles.navBar__item} ${styles.active}`
            : `${styles.navBar__item}`
        }
      >
        <Link to="/users">
          <img className={styles.navIcon} src={usersIcon}></img>
        </Link>
      </div>

      <div
        className={
          props.currentPath === "/chatPage"
            ? `${styles.navBar__item} ${styles.active}`
            : `${styles.navBar__item}`
        }
      >
        <Link to="/chatPage">
          <Badge
            className="pointer"
            badgeContent={getMsgNotice()}
            color="primary"
            onClick={() => {
              // setShowDD(!showDD);
            }}
          >
            <img className={styles.navIcon} src={chatIcon}></img>
          </Badge>
        </Link>
      </div>
      <div
        className={
          props.currentPath === "/profile"
            ? `${styles.navBar__item} ${styles.active}`
            : `${styles.navBar__item}`
        }
      >
        <Link to="/profile">
          <img className={styles.navIcon} src={settingsIcon}></img>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
