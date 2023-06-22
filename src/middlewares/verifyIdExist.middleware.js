const findUserIndex = require("../helpers/findUserIndex.helper");

const verifyIdExist = (ctx, next) => {
  const index = findUserIndex(ctx.params.id);
  if (index === false) {
    ctx.status = 404;
    ctx.body = { error: "User not found!" };
  } else {
    ctx.request.index = index;
    return next();
  }
};

module.exports = verifyIdExist;
