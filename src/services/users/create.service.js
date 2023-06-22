const users = require("../../database/index.js");
const { v4: uuidv4 } = require("uuid");

const create = (payload) => {
  const user = {
    ...payload,
    id: uuidv4(),
  };
  users.push(user);
  return user;
};

module.exports = create;
