import users from "../../database/index.js";
import { v4 as uuidv4 } from "uuid";

const create = (payload) => {
  const user = {
    ...payload,
    id: uuidv4(),
  };
  users.push(user);
  return user;
};

export default create;
