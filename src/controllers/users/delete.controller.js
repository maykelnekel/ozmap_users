const deleteService = require("../../services/users/delete.service");

const deleteController = (ctx) => {
  deleteService(ctx.request.index);
  ctx.status = 204;
};

module.exports = deleteController;
