import React, { useState } from "react";

function Sidebar({ user }) {
  const [channelState, setChannelState] = useState({
    channelName: "",
    channelDescription: "",
    error: null,
  });

  return (
    <fieldset className="chats">
      <legend>Chats</legend>
      <div className="chatsContent">
        <p>Logged in as: {user.nickname}</p>
        <div className="channelsList">
          <div>
            <p>Online Users</p>
          </div>
          <p>#Community</p>
        </div>
        <div className="divider doodle-border"></div>
        <div className="usersList">
          <div>
            <p>Online Users</p>
          </div>
          <p> - Simon </p>
        </div>
      </div>
      <button className="disconnectBtn">Disconnect</button>
    </fieldset>
  );
}

export default Sidebar;
