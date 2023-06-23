const users = require("../../database/index.js");

const create = (payload) => {
  users.push(payload);
  return payload;
};

module.exports = create;
