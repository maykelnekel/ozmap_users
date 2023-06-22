const users = require("../../database/index.js");

const delet = (index) => {
  users.splice(index, 1);
  return true;
};

module.exports = delet;
