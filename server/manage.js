const events = require("../src/constants/events");
const methods = require("./methods");

let servers = {
  "265f01c6-a966-11ec-b909-0242ac120002": { users: [], channels: [] },
};

module.exports = (io) => (socket) => {
  socket.on(events.IS_USER_TAKEN, (nickname, uniqueServerID, cb) => {
    let doesServerExist = methods.doesServerExist(uniqueServerID, servers);
    let nickNameIsTaken = true;
    let USI = null;
    console.log(doesServerExist);
    if (doesServerExist) {
      console.log(servers[uniqueServerID].users);
      nickNameIsTaken = methods.isNicknameTaken(
        servers[uniqueServerID].users,
        nickname
      );
      console.log(nickNameIsTaken);
      USI = uniqueServerID;
    } else {
      // Create new server here
      let newServer = methods.createServer();
      servers[newServer.uniqueServerID] = newServer.data[0];
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
    socket.user = user;
    console.log(servers[uniqueServerID].users);

    io.emit(events.NEW_USER, { newUsers: servers[uniqueServerID].users });
  });
};
