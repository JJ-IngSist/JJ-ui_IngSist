import React, {Fragment, useState} from "react";
import "./chat.scss";
import UserPanel from "./UserPanel";
import {ConversationModel, User, Message} from "../utils/models";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import Conversation from "./Conversation";
import {cleanCookies, messageUrl} from "../utils/http";

function Chat() {

  const [activeUser, setActiveUser] = useState<User>({id: 0, username: '', password: '', description: '', email: '', name: ''});
  const [stompClient, setStompClient] = useState(null)
  const [conversation, setConversation] = useState<ConversationModel>({id: 0, user1: 0, user2: 0, messages: []})
  const [chat, setChat] = useState<Message[]>(conversation.messages)

  function connect() {
    const socket = new SockJS(messageUrl + 'jibber-jabber');
    const over = Stomp.over(socket);
    setStompClient(over);
    over.connect({"X-Authorization": "Bearer " + cleanCookies(document.cookie)}, function () {
      over.subscribe('/topic/messages', function (message) {
        addObjectMessage(JSON.parse(message.body));
      });
    });
  }

  function disconnect() {
    if (stompClient !== null) {
      stompClient.disconnect();
    }
  }

  function addObjectMessage(messageList) {
    setChat(messageList);
    scrollDown();
  }

  function scrollDown() {
    const chatBox = document.getElementById("thisistheend");

    if (chatBox) {
      // @ts-ignore
      chatBox.parentNode.scrollTo({
        top: chatBox.offsetTop,
        behavior: "smooth",
      });
    }
  }

  return (
    <Fragment>
      <div className="section-1">
        <UserPanel setActiveUser={setActiveUser} setConversation={setConversation} connect={connect} disconnect={disconnect}/>
        <Conversation activeUser={activeUser} stompClient={stompClient} conversation={conversation} setConversation={setConversation} chat={chat} setChat={setChat}/>
      </div>
    </Fragment>
  );
}

export default Chat;
