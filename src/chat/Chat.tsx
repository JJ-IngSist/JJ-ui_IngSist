import React, {Fragment, useState} from "react";
import "./chat.scss";
import UserPanel from "./UserPanel";
import {ConversationModel, User, Message} from "../utils/models";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import Conversation from "./Conversation";
import {messageUrl} from "../utils/http";

function Chat() {

  const [activeUser, setActiveUser] = useState<User>({id: 0, username: '', password: '', description: '', email: '', name: ''});
  const [stompClient, setStompClient] = useState(null)
  const [conversation, setConversation] = useState<ConversationModel>({id: 0, user1: 0, user2: 0, messages: []})

  function connect() {
    const socket = new SockJS(messageUrl + 'jibber-jabber');
    const over = Stomp.over(socket);
    setStompClient(over);
    over.connect({}, function () {
      over.subscribe('/topic/messages', function (message) {
        addObjectMessage(JSON.parse(message.body), conversation.messages);
      });
    });
  }

  function disconnect() {
    if (stompClient !== null) {
      stompClient.disconnect();
    }
  }

  function addStringMessage(message, chat) {
    const newMsg : Message = {text: message, sender_id: +localStorage.getItem('id'), receiver_id: activeUser.id}
    const array = chat.concat(newMsg)
    setConversation({...conversation, messages: array})
    return array;
  }

  function addObjectMessage(message, chat) {
    const newMsg : Message = {text: message.text, sender_id: message.sender_id, receiver_id: message.receiver_id}
    const array = chat.concat(newMsg)
    setConversation({...conversation, messages: array})
    return array;
  }

  return (
    <Fragment>
      <div className="section-1">
        <UserPanel setActiveUser={setActiveUser} setConversation={setConversation} connect={connect} disconnect={disconnect}/>
        <Conversation activeUser={activeUser} stompClient={stompClient} conversation={conversation} addStringMessage={addStringMessage} setConversation={setConversation}/>
      </div>
    </Fragment>
  );
}

export default Chat;
