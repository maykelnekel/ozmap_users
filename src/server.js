import koa from "./app.js";

const PORT = process.env.PORT || 3000;

const server = () => {
  koa.listen(PORT);
  console.log(`Aplication running at http://localhost:${PORT}`);
};
server();

export { server };
