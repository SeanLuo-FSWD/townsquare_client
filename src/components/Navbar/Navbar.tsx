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
import {
  removeHasMessage
} from "../../utils/api/realtime.api";

function Navbar(props: any) {
  const { setCerror, currentUser, setCurrentUser } = useContext(LoginContext);
  // const [msgNotice, setMsgNotice] = useState(currentUser.hasMessage);

  useEffect(() => {
    console.log("navbar useeffect set");

    socket.on("new_message_notification", () => {
      console.log("2222222222222222");
      console.log("new______message________notification____FE");

      // If user already on the chatLIST page, no need to display new message, and instead remove the "hasNewMessage" for that user.
      if(window.location.pathname === "/chatPage") {

  
        
        removeHasMessage((err: Error, result: any) => {
          if (err) {
            setCerror(err.message);
          } 
          else {
            setCurrentUser({ ...currentUser, hasMessage: false });
          }
        });
      }
      else {
        setCurrentUser({ ...currentUser, hasMessage: true });
      }

    });

    return () => {
      socket.off("new_message_notification");
    };
  }, []);

  const getMsgNotice = () => {
    console.log("xxxxxxxxxxxxxxxxxxxxxx");
    console.log(currentUser);

    let display = null;

    if (
      // window.location.pathname != "/chatPage" &&
      // window.location.pathname != "/chat" &&
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
            // onClick={() => {
            // }}
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
