import React, {useEffect} from "react";
import {get, messageUrl} from "../utils/http";

const UserNode = ({ user, number, setUser, setConversation, connect, disconnect }) => {

  function conversation() {
    get(messageUrl + "conversation/" + user.id + "/" + +localStorage.getItem("id"))
      .then(res => {
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
    </button>
  );
};

export default UserNode;
