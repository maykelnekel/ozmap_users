const readService = require("../../services/users/read.service");

const readController = (ctx) => {
  ctx.status = 200;
  ctx.body = readService();
};

module.exports = readController;
