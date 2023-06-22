const deleteService = require("../../services/users/delete.service");

const deleteController = (ctx) => {
  deleteService(ctx.request.index);
  ctx.status = 200;
};

module.exports = deleteController;
