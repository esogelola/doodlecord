import React from "react";

function Message({ nickname, content, date }) {
  return (
    <div className={`chatContainerListItem  ${nickname === "Sam" && "user"}`}>
      <span>
        {nickname} - {date}
      </span>
      <p className="doodle-border">{content}</p>
    </div>
  );
}

export default Message;
