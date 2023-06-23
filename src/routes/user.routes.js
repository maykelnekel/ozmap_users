const Router = require("koa-router");
const createController = require("../controllers/users/create.controller");
const readController = require("../controllers/users/read.controller");
const readOneController = require("../controllers/users/readOne.controller");
const updateController = require("../controllers/users/update.controller");
const deleteController = require("../controllers/users/delete.controller");
const verifyUserExist = require("../middlewares/verifyUserExist.middleware");

const router = new Router();

const PORT = process.env.PORT || 3000;
router.get("/", async (ctx) => {
  ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`;
});

router
  .get("/users", (ctx) => readController(ctx))
  .post("/user", (ctx) => createController(ctx))
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
    (ctx) => updateController(ctx)
  );

module.exports = router;
