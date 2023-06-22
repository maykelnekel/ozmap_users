const users = require("../../database/index.js");

const readOne = (index) => users[index];

module.exports = readOne;
