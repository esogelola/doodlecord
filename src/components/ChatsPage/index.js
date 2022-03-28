import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MessagesBody from "./MessagesBody";
import MessageInput from "./MessageInput";
import EVENTS from "../../constants/events";
function ChatsPage({ user, users, pChats, socket, logout }) {
  const [isRecording, setRecording] = React.useState(false);
  const [messages, setMessages] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);

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
          <div className="chatContainerList">
            {Array.from(Array(10).keys()).map((e) => {
              return (
                <div
                  className={`chatContainerListItem  ${e % 2 === 0 && "user"}`}
                >
                  <span>User - 3/17/2022 (5:26) </span>
                  <p className="doodle-border">Hello</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="userControls doodle-border">
          <MessageInput />
        </div>
      </div>
    </div>
  );
}

export default ChatsPage;
