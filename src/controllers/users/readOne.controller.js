const readOneService = require("../../services/users/readOne.service");

const readOneController = (ctx) => {
  ctx.status = 200;
  ctx.body = readOneService(ctx.request.index);
};

module.exports = readOneController;
