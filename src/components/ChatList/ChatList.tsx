import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { getAllConversationsByUserId } from "../../utils/api/people.api";
import _ from "lodash";
import socket from "../../utils/socketIO.util";
import ChatListItem from "./ChatListItem";
import Error from "../Error/Error";
import styles from "./ChatList.module.scss";
import Spinning from "../../pages/spinning.page";

function ChatList() {
  const [chatList, setChatList] = useState(null) as any;

  const { cerror, setCerror, currentUser, setCurrentUser } =
    useContext(LoginContext);

  useEffect(() => {
    getAllConversationsByUserId((err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setChatList(result);
      }
    });
    socket.on("updateChats", (latestConversations) => {
      console.log("User gotten a chat, is this just on Chat page?");

      setChatList(latestConversations);
    });

    return () => {
      socket.off("updateChats");

      console.log("zzzzzzzzzz_________zzzzzzzzzzzzz");

      setCurrentUser({ ...currentUser, hasMessage: false });
    };
  }, []);

  if (chatList) {
    console.log("chatList", chatList);
    return (
      <>
        {chatList.map((c: any) => {
          return (
            <ChatListItem
              key={c.conversationId}
              convo={c}
              currentUser={currentUser}
            />
          );
        })}
        {/* {getAvatars(chatList)}
        {chatList.length > 4 && <span>...</span>} */}
      </>
    );
  } else {
    return (
      <>
        <Spinning />
      </>
    );
  }
}

export default ChatList;
