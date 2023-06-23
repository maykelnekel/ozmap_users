const users = require("../database");

const verifyEmailAlreadyExists = (ctx, next) => {
  const user = users.find((user) => user.email === ctx.body.email);
  if (user) {
    ctx.status = 409;
    ctx.body = { error: "O email já está registrado" };
  } else {
    ctx.request.index = index;
    return next();
  }
};

module.exports = verifyEmailAlreadyExists;
