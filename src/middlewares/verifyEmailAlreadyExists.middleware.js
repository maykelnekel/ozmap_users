const errorMessages = require("../../test/mocks/erroMessages");
const users = require("../database");

const verifyEmailAlreadyExists = (ctx, next) => {
  const user = users.find((user) => user.email === ctx.request.body.email);
  if (user) {
    ctx.status = 409;
    ctx.body = { error: errorMessages.emailJaRegistrado };
  } else {
    return next();
  }
};

module.exports = verifyEmailAlreadyExists;
