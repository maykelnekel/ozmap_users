const userSchema = require("../../test/schemas");

const verifyAge = (ctx, next) => {
  const body = ctx.request.body;

  if (body.idade < 18) {
    ctx.status = 409;
    ctx.body = {
      error: "Usuários com menos de 18 anos não são permitidos",
    };
  } else {
    return next();
  }
};

module.exports = verifyAge;
