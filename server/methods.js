const { v4 } = require("uuid");
var Filter = require("bad-words"),
  filter = new Filter();

const isBadWords = (nickname) => filter.isProfane(nickname);

const isNicknameTaken = (users, nickname) => {
  console.log({ users, nickname });
  return false;
};

const createUser = (nickname, socketId) => ({ nickname, socketId });

const addUsers = (server, user) => {
  console.log({ server });
  // server.users[user.nickname] = user.nickname;

  return [];
};

const createChannel = ({
  name = "General",
  description = "Default discussion channel",
} = {}) => ({
  users: [],
  name,
  description,
  messages: [],
  msgCount: 0,
  typingUser: [],
});

const doesServerExist = (serverId, servers) => servers[serverId] !== undefined;

const createServer = () => ({ uniqueServerID: v4(), data: [createChannel()] });
const delUser = (users, nickname) => {
  delete users[nickname];
  return users;
};

const createMessage = (message, sender) => ({
  id: v4(),
  time: new Date(Date.now()),
  message,
  sender,
});

module.exports = {
  isNicknameTaken,
  createUser,
  addUsers,
  createServer,
  delUser,
  createMessage,
  doesServerExist,
  isBadWords,
};
