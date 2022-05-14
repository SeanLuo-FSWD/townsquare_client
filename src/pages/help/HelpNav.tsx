import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import styles from "./HelpNav.module.scss";
import { Link, useHistory } from "react-router-dom";
import {
  removeNoticeById,
  clearAllNotifications,
} from "../../utils/api/auth.api";
import { v4 as uuidv4 } from "uuid";
import townSquareLogo from "../../components/Navbar/assets/townSquareLogo.svg";
import backIcon from "./assets/backIcon.svg";
import dotenv from "dotenv";
dotenv.config();

function HelpNav(props: any) {
  const { setCerror, currentUser } = useContext(LoginContext);
  const history = useHistory();

  const [showDD, setShowDD] = useState(false);

  // console.log(props.notices);
  const tappable = new Set(["pagePadding", "vsc-initialized"]);
  useEffect(() => {
    document.body.addEventListener("click", (e: any) => {
      // e.stopPropagation();
      // debugger;
      if (tappable.has(e.target.className)) {
        setShowDD(false);
      }
    });
  }, []);

  function removeMapThenRedirect(
    link: string,
    noticeId: string,
    receiverId: string
  ) {
    const notice_obj = {
      notificationId: noticeId,
      receiverId: receiverId,
    };
    removeNoticeById(notice_obj, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        console.log("HelpNav - getNotice : result <=====================");

        console.log(result);
        props.doNoticeSetProp(result);
        const linkTarget = {
          pathname: link,
          key: uuidv4(),
        };
        history.push(linkTarget);
      }
    });
  }

  function clearAll() {
    clearAllNotifications((err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        props.doNoticeSetProp([]);
        setShowDD(false);
      }
    });
  }

  function togglePortalProp() {
    setShowDD(false);
  }

  return (
    <div className={`${styles.subNav}`}>
      <div className={styles.logoWrap}>
        <img
          className={`pointer ${styles.logo}`}
          src={townSquareLogo}
          onClick={() => {
            history.push("/help");
          }}
        />
        <p className={styles.logoTitle}>Help / FAQ</p>
        {/* <p style={{ paddingLeft: "20px" }}>{currentUser.username}</p> */}
        {/* <div>TownSquare</div> */}
      </div>

      <div className={styles.demoWrap}>
        <p>
          <a
            className={styles.demoText}
            href="https://youtu.be/TWWylIMUOBg"
            target="_blank"
          >
            View Demo
          </a>
        </p>
      </div>

      <div className={styles.goBackWrap}>
        <a href={process.env.REACT_APP_URL} style={{ display: "block" }}>
          <button className={styles.backButton}>
            Back
            <img src={backIcon} className={styles.backIcon} />
          </button>
        </a>
      </div>
    </div>
  );
}

export default HelpNav;
