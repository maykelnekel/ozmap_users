const Router = require("koa-router");

const createController = require("../controllers/users/create.controller");
const readController = require("../controllers/users/read.controller");
const readOneController = require("../controllers/users/readOne.controller");
const updateController = require("../controllers/users/update.controller");
const deleteController = require("../controllers/users/delete.controller");
const verifyUserExist = require("../middlewares/verifyUserExist.middleware");
const verifyRequiredFields = require("../middlewares/verifyRequiredFields.middleware");
const verifyPermitedFields = require("../middlewares/verifyPermitedFields.middleware");
const verifyAge = require("../middlewares/verifyAge.middleware");
const verifyEmailAlreadyExists = require("../middlewares/verifyEmailAlreadyExists.middleware");
const veryifyTypeOfFields = require("../middlewares/veryifyTypeOfFields.middleware");
const users = require("../database");

const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = users;
});

router
  .get("/users", (ctx) => readController(ctx))
  .post(
    "/user",
    (ctx, next) => verifyRequiredFields(ctx, next),
    (ctx, next) => verifyPermitedFields(ctx, next),
    (ctx, next) => veryifyTypeOfFields(ctx, next),
    (ctx, next) => verifyAge(ctx, next),
    (ctx, next) => verifyEmailAlreadyExists(ctx, next),
    (ctx) => createController(ctx)
  )
  .delete(
    "/user/:nome",
    (ctx, next) => verifyUserExist(ctx, next),
    (ctx) => deleteController(ctx)
  )
  .get(
    "/user/:nome",
    (ctx, next) => verifyUserExist(ctx, next),
    (ctx) => readOneController(ctx)
  )
  .patch(
    "/user/:nome",
    (ctx, next) => verifyUserExist(ctx, next),
    (ctx, next) => verifyPermitedFields(ctx, next),
    (ctx, next) => veryifyTypeOfFields(ctx, next),
    (ctx, next) => verifyAge(ctx, next),
    (ctx, next) => verifyEmailAlreadyExists(ctx, next),
    (ctx) => updateController(ctx)
  );

module.exports = router;
