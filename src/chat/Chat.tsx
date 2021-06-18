import React, {Fragment, useState} from "react";
import "./chat.scss";
import UserPanel from "./UserPanel";
import {ConversationModel, User, Message} from "../utils/models";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import Conversation from "./Conversation";
import {messageUrl} from "../utils/http";
import useStateWithCallback from 'use-state-with-callback';

function Chat() {

  const [activeUser, setActiveUser] = useState<User>({id: 0, username: '', password: '', description: '', email: '', name: ''});
  const [stompClient, setStompClient] = useStateWithCallback(null, connectWithSocket)
  const [conversation, setConversation] = useState<ConversationModel>({id: 0, user1: 0, user2: 0, messages: []})

  function connect() {
    const socket = new SockJS(messageUrl + 'jibber-jabber');
    setStompClient(Stomp.over(socket));
  }

  function connectWithSocket() {
    stompClient.connect({}, function () {
      stompClient.subscribe('/topic/messages', function (string) {
        addMessage(JSON.parse(string.body).string, conversation.messages);
      });
    });
  }


  function disconnect() {
    if (stompClient !== null) {
      stompClient.disconnect();
    }
  }

  function addMessage(text, chat) {
    const newMsg : Message = {text: text, sender_id: +localStorage.getItem('id'), receiver_id: activeUser.id}
    const array = chat.concat(newMsg)
    setConversation({...conversation, messages: array})
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
