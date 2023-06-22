import { usersService } from "../services/index.js";

export const read = (ctx) => {
  ctx.status = 200;
  ctx.body = usersService.read();
};

export const create = (ctx) => {
  const user = usersService.create(ctx.request.body);
  ctx.body = user;
  ctx.status = 201;
};

export const delet = (ctx) => {
  usersService.delet(ctx.request.index);
  ctx.status = 204;
};

export const readOne = (ctx) => {
  ctx.status = 200;
  ctx.body = usersService.readOne(ctx.request.index);
};

export const update = (ctx) => {
  ctx.status = 200;
  ctx.body = usersService.update(ctx.request.body, ctx.request.index);
};
