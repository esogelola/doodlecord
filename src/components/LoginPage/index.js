import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import EVENTS from "../../constants/events";

function LoginPage({ login, socket }) {
  const [error, setError] = useState("");
  const nicknameRef = useRef(null);
  const uniqueServerID = useRef(null);

  const handleSubmit = () => {
    let nickname = nicknameRef.current.value;

    let isNotEmpty = Boolean(nickname);

    const setUser = ({ user, hasError, server }) => {
      if (hasError) {
        console.log(hasError);
        setError(hasError);
      } else {
        setError("");
        login({ user, server });
      }
    };

    // If the user has put a nickname
    if (isNotEmpty) {
      // We check if the users nickname is taken and then if not set the users nickname
      // Also checks if the user is creating a chat or is joining a chat

      socket.emit(
        EVENTS.CONNECT_USER,
        nickname,
        uniqueServerID.current.value,
        setUser
      );
    } else {
      setError("Please input your nickname");
    }
  };

  return (
    <div className="loginSection">
      <div className="header">
        <img src="/logo512.png" className="logo" alt="Doodlecord Logo" />
        <h1>Doodlecord</h1>
        <p>Socket.IO + React</p>
      </div>
      <div>
        <p>
          {!error && (
            <label htmlFor="nickname-input">
              Get started, enter a username below.
            </label>
          )}
          {error && (
            <label htmlFor="nickname-input" className="loginError">
              {error}.
            </label>
          )}
          <br />
          <input
            id="nickname-input"
            type="text"
            placeholder="Your nickname"
            ref={nicknameRef}
          />
          <br />
          <label htmlFor="nickname-input">
            Have a friends server id? Enter it below.
          </label>
          <br />
          <input
            id="nickname-input"
            type="text"
            placeholder="Unique Server ID"
            ref={uniqueServerID}
          />
        </p>
        <br />
        <div className="buttonGroup">
          <button type="button" name="button" onClick={handleSubmit}>
            CONNECT
          </button>
        </div>

        <div className="divider"></div>
        <ul className="home-list">
          <li>
            <a href="https://esogelola.com/" target="_blank" rel="noreferrer">
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="https://esogelola.com/doodlecord"
              target="_blank"
              rel="noreferrer"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="https://github.com/esogelola"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LoginPage;
