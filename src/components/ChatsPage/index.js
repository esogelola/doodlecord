import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MessageInput from "./MessageInput";
import EVENTS from "../../constants/events";
import MessagesList from "./MessagesList";
function ChatsPage({ user, users, pChats, socket, logout }) {
  const [isRecording, setRecording] = React.useState(false);
  const [activeChannel, setActiveChannel] = useState(null);
  const [messages, setMessages] = useState([
    { nickname: "Adam", content: "Hello", date: "3/17/2022 (5:26 PM)" },
    { nickname: "Sam", content: "Hello", date: "3/17/2022 (5:26 PM)" },
    { nickname: "Adam", content: "Hello", date: "3/17/2022 (5:26 PM)" },
  ]);
  useEffect(() => {
    socket.emit(EVENTS.INIT_CHATS);
    socket.on(EVENTS.MESSAGE_SEND, addMessage);
  }, []);

  const addMessage = ({ channel, message }) => {};
  return (
    <div className="chatSection">
      <Sidebar user={user} />

      <div className="chatLog">
        <div className="chatContainer doodle-border">
          <MessagesList Messages={messages} />
        </div>
        <div className="userControls doodle-border">
          <MessageInput />
        </div>
      </div>
    </div>
  );
}

export default ChatsPage;
