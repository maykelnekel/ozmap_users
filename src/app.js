//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const userRouter = require("./routes/user.routes.js");

const koa = new Koa();

//Uma rota de exemplo simples aqui.
//As rotas devem ficar em arquivos separados, /src/controllers/userController.js por exemplo

koa.use(bodyParser()).use(userRouter.routes()).use(userRouter.allowedMethods());

module.exports = koa;
