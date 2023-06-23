const errorMessages = require("../../test/mocks/erroMessages");
const userSchema = require("../../test/schemas");

const verifyPermitedFields = (ctx, next) => {
  const body = ctx.request.body;
  const keys = Object.keys(body);

  const verify = keys.some((element) => !userSchema.required.includes(element));
  if (verify) {
    ctx.status = 400;
    ctx.body = {
      error: errorMessages.campoInvalido,
    };
  } else {
    return next();
  }
};

module.exports = verifyPermitedFields;
