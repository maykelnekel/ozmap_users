const bodyParser = require("koa-bodyparser");
const Koa = require("koa");
const userRouter = require("./routes/user.routes.js");

const koa = new Koa();

koa.use(bodyParser()).use(userRouter.routes()).use(userRouter.allowedMethods());

module.exports = koa;
