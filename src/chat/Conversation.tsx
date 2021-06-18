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
  addStringMessage: Function,
  setConversation: Function
}

export default function Conversation(props: Props) {
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setMessage(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    sendMessage(message);
    const cloned_array = await props.addStringMessage(message, props.conversation.messages);
    setMessage("");
    // props.setConversation({...props.conversation, messages: props.conversation.messages.concat(cloned_array)});
    scrollDown();
  }

  function sendMessage(message) {
    props.stompClient.send("/conversation/chat", {}, JSON.stringify({text: message, conversation_id: props.conversation.id, token: cleanCookies(document.cookie)}));
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
      <div className="chat-container">
        <h2 className="chat-title">{props.activeUser ? props.activeUser.name : 'Select a user'}</h2>
        <MessageList chat={props.conversation.messages} />
        <SendMessageForm
          message={message}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </div>
    </Fragment>
  );


}
