import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import styles from "./SubNav.module.scss";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { Link, useHistory } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  doNoticeError,
  doNoticeAdd,
  doNoticeRemove,
  doNoticeSet,
} from "../../store/redux/actions/notice_act";
import {
  removeNoticeById,
  clearAllNotifications,
} from "../../utils/api/auth.api";
import HelpIcon from "@material-ui/icons/Help";
import { v4 as uuidv4 } from "uuid";
import townSquareLogo from "./assets/townSquareLogo.svg";
import Overlay from "../../UI/Overlay";
import { notificationActions } from "../../store/redux/reducers/notificationSlice";
// import { notificationActions } from "../../store/redux/reducers/notificationSlice";

function SubNav(props: any) {
  const { setCerror, currentUser } = useContext(LoginContext);
  const history = useHistory();
  const [showDD, setShowDD] = useState(false);

  // console.log(notification);
  const tappable = new Set(["pagePadding", "vsc-initialized"]);

  const notification = useSelector((state: any) => state.notificationState.notices);
  // const notification = useSelector((state: any) => state);
  const dispatch = useDispatch();

  useEffect(() => {
      console.log('xxxxxxxxxxx2222222222222222xxxxxxxxxxx');
      console.log(notification);
  }, [notification, dispatch]);

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

    console.log('notice___removallll____start: ');
    console.log(link);
    console.log(noticeId);
    console.log(receiverId);
    console.log('notice___removallll____end: ');
    
    const notice_obj = {
      notificationId: noticeId,
      receiverId: receiverId,
    };
    removeNoticeById(notice_obj, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        console.log("SubNav - getNotice : result <=====================");

        console.log(result);

        dispatch(notificationActions.noticeStateSet(result));
        // notificationActions.noticeStateSet(result);
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
        dispatch(notificationActions.noticeStateSet([]));
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
        <p className={styles.logoTitle}>{currentUser.username}</p>
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

      <div className={styles.commonIcons}>
        {props.children}

        <div>
          <Badge
            className="pointer"
            badgeContent={notification.length}
            max={10}
            color="primary"
            onClick={() => {
              setShowDD(!showDD);
            }}
          >
            <NotificationsIcon
              className={styles.notificationIcon}
              onClick={() => {
                setShowDD(!showDD);
              }}
            />
          </Badge>
        </div>

        {showDD && (
          <>
            <div className={styles.alert}>
              {notification.map((n: any) => {
                return (
                  <div className={styles.notificationWrapper}>
                    <div key={n._id}>
                      <p
                        style={{ color: "black" }}
                        className="pointer"
                        onClick={() =>
                          removeMapThenRedirect(n.link, n._id, n.receiverId)
                        }
                      >
                        {/* <Link to={n.link}>{n.message}</Link> */}
                        <span className={styles.userInfoWrapper}>
                          {n.message}
                        </span>
                        <span className={styles.dateWrapper}>
                          {new Date(n.createdAt).toDateString()}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}

              <button
                className={styles.clearButton}
                onClick={clearAll}
                style={{ float: "right" }}
              >
                Clear all
              </button>
            </div>
            <Overlay transparent={true} togglePortalProp={togglePortalProp} />
          </>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    notices: state.noticeState.notices,
    error: state.chatState.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    doNoticeErrorProp: (error: any) => dispatch(doNoticeError(error)),
    doNoticeAddProp: (notice: {
      _id: string;
      message: string;
      link: string;
      createdAt: Date;
    }) => dispatch(doNoticeAdd(notice)),
    doNoticeRemoveProp: (noticeId: string) =>
      dispatch(doNoticeRemove(noticeId)),
    doNoticeSetProp: (notices: any) => dispatch(doNoticeSet(notices)),
  };
};

// export default SubNav;
export default connect(mapStateToProps, mapDispatchToProps)(SubNav);
