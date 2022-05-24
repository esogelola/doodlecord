const events = require("../src/constants/events");
const methods = require("./methods");

let servers = {
  "265f01c6-a966-11ec-b909-0242ac120002": { users: [], channels: [] },
};

module.exports = (io) => (socket) => {
  socket.on(events.CONNECT_USER, (nickname, uniqueServerID, cb) => {
    // We check if the server they are trying to join exist, if not we create a new server. If it does if connect the user to the sevrer they trying to join
    let doesServerExist = methods.doesServerExist(uniqueServerID, servers);
    let nickNameIsTaken = true;
    //USI => User SERVER ID
    let USI = null;

    if (doesServerExist) {
      nickNameIsTaken = methods.isNicknameTaken(
        servers[uniqueServerID].users,
        nickname
      );

      USI = uniqueServerID;
    } else {
      // Create new server here
      let newServer = methods.createServer();
      console.log({ newServer });
      servers[newServer.uniqueServerID] = newServer.data[0];
      console.log({ servers });
      USI = newServer.uniqueServerID;
      nickNameIsTaken = false;
    }
    let containsBadWords = methods.isBadWords(nickname);

    containsBadWords || nickNameIsTaken
      ? cb({
          hasError:
            (containsBadWords && "This Nickname contains bad language") ||
            (nickNameIsTaken && "This nickname is already taken"),
          user: null,
          server: null,
        })
      : cb({
          isUser: false,
          user: methods.createUser(nickname, socket.id),
          server: USI,
        });
  });

  socket.on(events.NEW_USER, (user, cb) => {
    const uniqueServerID = user.server;
    servers[uniqueServerID] = methods.addUsers(
      servers[uniqueServerID],
      user.user
    );
    console.log(uniqueServerID);
    socket.user = user;

    io.emit(events.NEW_USER, { newUsers: servers[uniqueServerID].users });
  });
};
