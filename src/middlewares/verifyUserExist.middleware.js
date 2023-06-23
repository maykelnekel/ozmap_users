const users = require("../database");

const verifyUserExist = (ctx, next) => {
  const index = users.findIndex((user) => user.nome === ctx.params.nome);
  if (index < 0) {
    ctx.status = 404;
    ctx.body = { error: "Usuário não encontrado" };
  } else {
    ctx.request.index = index;
    return next();
  }
};

module.exports = verifyUserExist;
