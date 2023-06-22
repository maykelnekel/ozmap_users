const updateService = require("../../services/users/update.service");

const updateController = (ctx) => {
  ctx.status = 200;
  ctx.body = updateService(ctx.request.body, ctx.request.index);
};

module.exports = updateController;
