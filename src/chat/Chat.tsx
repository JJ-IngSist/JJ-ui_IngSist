import React, {Fragment, useState} from "react";
import Conversation from "./Conversation";
import "./chat.scss";
import Following from "../layout/following";
import Layout from "../layout/Layout";
import UserPanel from "./UserPanel";
import {User} from "../utils/models";

function Chat() {

  const [activeUser, setActiveUser] = useState<User>();

  return (
    <Fragment>
      <div className="section-1">
        <UserPanel setActiveUser={setActiveUser}/>
        <Conversation activeUser={activeUser}/>
      </div>
    </Fragment>
  );
}

export default Chat;
