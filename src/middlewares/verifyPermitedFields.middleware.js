const userSchema = require("../../test/schemas");

const verifyPermitedFields = (ctx, next) => {
  const body = ctx.request.body;
  const keys = Object.keys(body);

  const verify = keys.some((element) => !userSchema.required.includes(element));
  if (verify) {
    ctx.status = 409;
    ctx.body = {
      error: "Os campos permitidos são apenas: nome, email, idade",
    };
  } else {
    return next();
  }
};

module.exports = verifyPermitedFields;
