const userSchema = require("../../test/schemas");

const veryifyTypeOfFields = (ctx, next) => {
  const body = ctx.request.body;
  const keys = Object.keys(body);

  const verify = keys.some((element) => {
    if (userSchema.properties[element]) {
      return typeof body[element] !== userSchema.properties[element].type;
    }
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

module.exports = veryifyTypeOfFields;
