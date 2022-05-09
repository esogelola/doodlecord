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
    const newSocket = io(`http://${window.location.hostname}:5000`);

    setSocket(newSocket);
    newSocket.on(EVENTS.LOGOUT, onAuth(false));
    newSocket.on(EVENTS.NEW_USER, onAuth(true));

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

  const onAuth =
    (isNewUsers) =>
    ({ newUsers, outUser }) => {
      if (isNewUsers) {
        const newServerChats = [...serverChats];

        // const newPChats = [...pChats];
        // const oldPChats = pChats.map((pChat) => pChat.name);

        // user &&
        //   Object.keys(newUsers).map((newUser) => {
        //     if (newUser !== user.nickname && !oldPChats.includes(newUser)) {
        //       newPChats.push({
        //         name: newUser,
        //         description: "direct message",
        //         messages: [],
        //         isTyping: false,
        //         msgCount: 0,
        //         type: "Private",
        //       });
        //     }
        //     return null;
        //   });
        // setUsers(newUsers);
        // setPChats(newPChats);

        console.log("New User joining");
      } else {
        // const newPChats = pChats.filter((pChat) => pChat.name !== outUser);
        // setUsers(newUsers);
        // setPChats(newPChats);
      }
    };
  return user ? (
    <ChatPage
      user={user}
      users={users}
      // pChats={pChats}
      socket={socket}
      logout={logout}
    />
  ) : (
    <LoginPage socket={socket} login={login} />
  );
}

export default App;
