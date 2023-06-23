const userSchema = require("../../test/schemas");

const verifyRequiredFields = (ctx, next) => {
  const body = ctx.request.body;
  const keys = Object.keys(body);

  const verify = userSchema.required.some((element) => {
    return !keys.includes(element);
  });
  if (verify) {
    ctx.status = 400;
    ctx.body = {
      error: `Os campos a seguir são obrigatórios e devem ser do tipo especificado: ${userSchema.properties}`,
    };
  } else {
    return next();
  }
};

module.exports = verifyRequiredFields;
