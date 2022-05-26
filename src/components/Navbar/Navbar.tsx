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
import socket from "../../utils/socketIO.util";

function Navbar(props: any) {
  const { setCerror, currentUser, setCurrentUser } = useContext(LoginContext);

  useEffect(() => {
    console.log("navbar useeffect set");

    socket.on("new_message_notification", () => {
      setCurrentUser({ ...currentUser, hasMessage: true });
    });

    return () => {
      socket.off("new_message_notification");
    };
  }, []);

  const getMsgNotice = () => {

    let display = null;

    if (
      window.location.pathname != "/chatPage" &&
      window.location.pathname != "/chat" &&
      currentUser.hasMessage
    ) {
      display = "new";
    }

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
