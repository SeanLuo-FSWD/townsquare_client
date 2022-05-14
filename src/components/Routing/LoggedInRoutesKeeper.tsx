import React, { useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import Login from "../../pages/login/LoginPg";
import Profile from "../../pages/Profile/Profile";
import { Redirect, useHistory } from "react-router-dom";
const LoggedInRoutesKeeper = (props: any) => {
  const { currentUser } = useContext(LoginContext);
  const history = useHistory();
  return (
    <>
      {/* {cerror && <Error message={cerror} />} */}
      {!currentUser ? (
        <Login />
      ) : currentUser.firstTime ? (
        // <Profile />
        window.location.replace(`${process.env.REACT_APP_URL}/profile`)
      ) : (
        props.children
      )}
    </>
  );
  // }
};

export default LoggedInRoutesKeeper;
