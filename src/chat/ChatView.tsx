import React from "react";
import "./chat.scss";
import Layout from "../layout/Layout";
import Chat from "./Chat";

function ChatView() {

  return (
    <Layout child={<Chat/>}/>
  );
}

export default ChatView;
