import React from "react";
import { Link } from "react-router-dom";
import styles from "./UserGrid.module.scss";

function UserGrid(props: any) {
  return (
    <div className={styles.grid}>
      {props.people.map((user: any) => {
        const profile_pic = user.avatar;

        return (
          <div key={user._id} className={`${styles.userTile} flex--center`}>
            <div className={`${styles.cardContainer} flex--center`}></div>
            <img src={profile_pic} className={styles.profileAvatar}></img>
            <div
              className={styles.tileUsername}
              style={{ position: "absolute", bottom: "0" }}
            >
              {user.username}
            </div>
            <Link to={`/person/${user._id}`} />
          </div>
        );
      })}
    </div>
  );
}

export default UserGrid;
