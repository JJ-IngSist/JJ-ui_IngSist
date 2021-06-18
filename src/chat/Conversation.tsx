import React, {Fragment, useEffect, useState} from "react";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import "./chat.scss";
import {ConversationModel, User, Message} from "../utils/models";
import {cleanCookies} from "../utils/http";

type Props = {
  activeUser: User,
  stompClient: any,
  conversation: ConversationModel,
  setConversation: Function,
  chat: Message[],
  setChat: Function
}

export default function Conversation(props: Props) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    props.setChat(props.conversation.messages.concat(props.chat));
  }, [])

  function handleChange(event) {
    setMessage(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    sendMessage(message);
    setMessage("");
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

  function sendMessage(message) {
    props.stompClient.send("/conversation/chat", {}, JSON.stringify({text: message, conversation_id: +localStorage.getItem("conversation"), token: cleanCookies(document.cookie)}));
  }

  return (
    <Fragment>
      <div className="chat-container">
        <h2 className="chat-title">{props.activeUser ? props.activeUser.name : 'Select a user'}</h2>
        {props.chat.length === 0 ? <MessageList chat={props.conversation.messages}/> : <MessageList chat={props.chat} />}
        <SendMessageForm
          message={message}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </div>
    </Fragment>
  );
}
