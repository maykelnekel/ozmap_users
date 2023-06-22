const users = require("../database/index.js");

const findUserIndex = (name) => {
  const index = users.findIndex((user) => user.name === name);
  if (index >= 0) {
    return index;
  } else {
    return false;
  }
};

module.exports = findUserIndex;
