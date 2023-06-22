const Router = require("koa-router");
const createController = require("../controllers/users/create.controller");
const readController = require("../controllers/users/read.controller");
const readOneController = require("../controllers/users/readOne.controller");
const updateController = require("../controllers/users/update.controller");
const deleteController = require("../controllers/users/delete.controller");
const verifyIdExist = require("../middlewares/verifyIdExist.middleware");

const router = new Router();

const PORT = process.env.PORT || 3000;
router.get("/", async (ctx) => {
  ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
});

router.get("/users", (ctx) => readController(ctx));
router.post("/user", (ctx) => createController(ctx));
router.delete(
  "/user/:name",
  (ctx, next) => verifyIdExist(ctx, next),
  (ctx) => deleteController(ctx)
);
router.get(
  "/user/:name",
  (ctx, next) => verifyIdExist(ctx, next),
  (ctx) => readOneController(ctx)
);
router.patch(
  "/user/:name",
  (ctx, next) => verifyIdExist(ctx, next),
  (ctx) => updateController(ctx)
);

module.exports = router;
