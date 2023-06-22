import Router from "koa-router";
import { userController } from "../controllers/index.js";
import middlewares from "../middlewares/index.js";

const router = new Router({
  prefix: "/users",
});
router
  .get("/", (ctx) => userController.read(ctx))
  .post("/", (ctx) => userController.create(ctx))
  .delete(
    "/:id",
    (ctx, next) => middlewares.verifyIdExist(ctx, next),
    (ctx) => userController.delet(ctx)
  )
  .get(
    "/:id",
    (ctx, next) => middlewares.verifyIdExist(ctx, next),
    (ctx) => userController.readOne(ctx)
  )
  .patch(
    "/:id",
    (ctx, next) => middlewares.verifyIdExist(ctx, next),
    (ctx) => userController.update(ctx)
  );

export default router;
