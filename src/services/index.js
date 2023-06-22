import create from "./users/create.service.js";
import delet from "./users/delete.service.js";
import read from "./users/read.service.js";
import readOne from "./users/readOne.service.js";
import update from "./users/update.service.js";

export const usersService = {
  read,
  create,
  delet,
  readOne,
  update,
};
