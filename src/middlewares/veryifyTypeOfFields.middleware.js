const errorMessages = require("../../test/mocks/erroMessages");
const userSchema = require("../../test/schemas");

const veryifyTypeOfFields = (ctx, next) => {
  const body = ctx.request.body;
  const keys = Object.keys(body);

  const error =
    ctx.method === "POST"
      ? errorMessages.campoFaltandoOuTipoInvalidoPOST
      : errorMessages.campoFaltandoOuTipoInvalidoPATCH;

  const verify = keys.some((element) => {
    if (userSchema.properties[element]) {
      return typeof body[element] !== userSchema.properties[element].type;
    }
  });
  if (verify) {
    ctx.status = 400;
    ctx.body = {
      error,
    };
  } else {
    return next();
  }
};

module.exports = veryifyTypeOfFields;
