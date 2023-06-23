const errorMessages = require("../../test/mocks/erroMessages");

const verifyAge = (ctx, next) => {
  const body = ctx.request.body;

  if (body.idade < 18) {
    ctx.status = 409;
    ctx.body = {
      error: errorMessages.menorDeIdade,
    };
  } else {
    return next();
  }
};

module.exports = verifyAge;
