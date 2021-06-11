import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_MESSAGE_EVENT = "new-message-event";
const SOCKET_SERVER_URL = "http://localhost:9092";

const useChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    // @ts-ignore
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    // @ts-ignore
    socketRef.current.on(NEW_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        // @ts-ignore
        isOwner: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      // @ts-ignore
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (messageBody) => {
    // @ts-ignore
    socketRef.current.emit(NEW_MESSAGE_EVENT, {
      body: messageBody,
      // @ts-ignore
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage };
};

export default useChatRoom;