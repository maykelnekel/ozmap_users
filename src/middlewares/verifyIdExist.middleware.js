import findUserIndex from "../helpers/findUserIndex.helper.js";

const verifyIdExist = (ctx, next) => {
  const index = findUserIndex(ctx.params.id);
  if (!index) {
    ctx.status = 404;
    ctx.body = { error: "User not found!" };
  } else {
    ctx.request.index = index;
    return next();
  }
};

export default verifyIdExist;
