const users = require("../../database/index.js");

const read = () => {
  return users;
};

module.exports = read;
