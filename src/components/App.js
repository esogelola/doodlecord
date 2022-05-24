import { useState, useEffect } from "react";
import "./App.css";
import ChatPage from "../components/ChatsPage/";
import LoginPage from "../components/LoginPage/";

import io from "socket.io-client";
import EVENTS from "../constants/events";

// ***** it will used in dev mode
const socketUrl = "http://localhost:5000";
// const socketUrl = "/";

function App() {
  const [user, setUser] = useState(null);
  const [server, setServer] = useState(null);

  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState({});
  const [serverChats, setServerChats] = useState([]);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:${4200}`);
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const login = (currentUser) => {
    console.log(currentUser);
    setUser(currentUser);
    socket.emit(EVENTS.NEW_USER, currentUser, setServer);
  };

  const logout = () => {
    socket.emit(EVENTS.LOGOUT);
    setUser(null);
  };

  return user ? (
    <ChatPage user={user} users={users} socket={socket} logout={logout} />
  ) : (
    <LoginPage socket={socket} login={login} />
  );
}

export default App;
