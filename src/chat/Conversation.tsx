import React, { Fragment, useState, useEffect, useLayoutEffect } from "react";
// import {
//   createSession,
//   initMessage,
//   inputMessage,
// } from "../services/apiService";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import "./chat.scss";

export default function Conversation({activeUser}) {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [sessionId, setSessionId] = useState("");

  async function delay() {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve("done");
      }, 2000)
    );
  }

  useEffect(() => {
    // async function initializer() {
    //   const res = await createSession();
    //   setSessionId(res.data.session_id);
    //   const sessionIdJSON = {
    //     session_id: res.data.session_id,
    //   };
    //   const message = await handleInitMsg(sessionIdJSON);
    //   await delay(); //fake delay
    //
    //   return message;
    //}

    //initializer();
  }, []);

  async function handleInitMsg(sessionId) {
    // try {
    //   setBlock(true);
    //   const response = await initMessage(sessionId);
    //   const responseArray = response.data.output.generic;
    //
    //   for (let res of responseArray) {
    //     if (res.response_type === "text") {
    //       const watsonReply = res.text;
    //       addMessage(watsonReply, true);
    //       // updateLastMessage(watsonReply);
    //       await delay();
    //     }
    //   }
    //   setBlock(false);
    // } catch (ex) {
    //   setBlock(false);
    //   console.log("exception!", ex);
    // }
  }

  function handleChange(event) {
    setMessage(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await addMessage(message, false);
    await getAssistantReply(message);
  }

  function addMessage(text, watson) {
    const newMsg = { text, watson, timestamp: Date.now() };
    const buffer = chat;
    buffer.push(newMsg);
    setMessage("");
    let cloned_array = [].concat(buffer);
    setChat(cloned_array);
    scrollDown();
  }

  function updateLastMessage(text) {
    const buffer = chat;
    buffer[buffer.length - 1].text = "";
    buffer[buffer.length - 1].timestamp = Date.now();
    buffer[buffer.length - 2].text = text;
    let cloned_array = [].concat(buffer);
    setChat(cloned_array);
    scrollDown();
  }

  async function getAssistantReply(message) {
    await addMessage(<div className="typing" />, true);

    try {
      const data = {
        session_id: sessionId,
        text: message,
      };

      //const response = await inputMessage(data);
      //console.log("get-reply", response);

      //const responseArray = response.data.output.generic;
      // for (let res of responseArray) {
      //   if (res.response_type === "text") {
      //     const watsonReply = res.text;
      //     await addMessage(watsonReply, true);
      //     await updateLastMessage(watsonReply);
      //     await delay();
      //   }
      //}
    } catch (ex) {
      console.log(ex);
    }
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
        <h2 className="chat-title">{activeUser ? activeUser.name : 'Select a user'}</h2>
        <MessageList chat={chat} />
        <SendMessageForm
          message={message}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </div>
    </Fragment>
  );
}
