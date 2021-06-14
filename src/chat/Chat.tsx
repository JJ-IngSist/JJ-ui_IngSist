import React, {Fragment, useState} from "react";
import "./chat.scss";
import UserPanel from "./UserPanel";
import {ConversationModel, User} from "../utils/models";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import Conversation from "./Conversation";
import {messageUrl} from "../utils/http";

function Chat() {

  const [activeUser, setActiveUser] = useState<User>({id: 0, username: '', password: '', description: '', email: '', name: ''});
  const [stompClient, setStompClient] = useState(null)
  const [conversation, setConversation] = useState<ConversationModel>({id: 0, user1: 0, user2: 0, messages: []})

  async function connect() {
    const socket = new SockJS(messageUrl + 'jibber-jabber');
    setStompClient(Stomp.over(socket));
    Stomp.over(socket).connect({}, function () {
      Stomp.over(socket).subscribe('/topic/messages', callback);
    });
  }

  function callback (string) {
    console.log(string);
    addMessage(JSON.parse(string.body).string, true, conversation.messages);
  }

  function disconnect() {
    if (stompClient !== null) {
      stompClient.disconnect();
    }
  }

  function addMessage(text, watson, chat) {
    const newMsg = { text, watson, timestamp: Date.now() };
    const array = chat.concat(newMsg)
    setConversation({...conversation, messages: array})
    debugger
    console.log(array);
    return array;
  }

  return (
    <Fragment>
      <div className="section-1">
        <UserPanel setActiveUser={setActiveUser} setConversation={setConversation} connect={connect} disconnect={disconnect}/>
        <Conversation activeUser={activeUser} stompClient={stompClient} conversation={conversation} addMessage={addMessage}/>
      </div>
    </Fragment>
  );
}

export default Chat;
