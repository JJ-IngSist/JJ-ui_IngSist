import React, {useEffect, useState} from "react";
import {get, messageUrl} from "../utils/http";

const UserNode = ({ user, number, setUser, setConversation, connect, disconnect }) => {

  const [notifications, setNotifications] = useState<number>(0)

  useEffect(() => {
    get(messageUrl + "notifications/" + user.id)
      .then(res => {
        setNotifications(res)
      })
      .catch()
  }, [])

  function conversation() {
    get(messageUrl + "conversation/" + user.id + "/" + +localStorage.getItem("id"))
      .then(res => {
        localStorage.setItem("conversation", res.id)
        setConversation(res)
      })
      .catch()
  }

  function handleOnClick() {
    setUser(user);
    conversation();
    disconnect()
    connect();
  }

  return (
    <button
      className={`buttonPanel-box buttonPanel-text-${number}`}
      onClick={handleOnClick}
    >
      {user.name}
      {notifications}
    </button>
  );
};

export default UserNode;
