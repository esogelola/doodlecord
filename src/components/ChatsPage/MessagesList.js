import React from "react";

import Message from "./Message";
function MessagesList({ Messages }) {
  return (
    <div className="chatContainerList">
      {Messages.map((e, key) => {
        return <Message {...e} key={key} />;
      })}
    </div>
  );
}

export default MessagesList;
