const createService = require("../../services/users/create.service");

const createController = (ctx) => {
  const user = createService(ctx.request.body);
  ctx.body = user;
  ctx.status = 201;
};

module.exports = createController;
