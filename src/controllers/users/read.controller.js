const readService = require("../../services/users/read.service");

const readController = (ctx) => {
  const userList = readService();
  ctx.status = 200;
  ctx.body = userList;
};

module.exports = readController;
