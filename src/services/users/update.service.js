import users from "../../database/index.js";

const update = (payload, index) => {
  const newUser = {
    ...users[index],
    ...payload,
  };

  users[index] = newUser;

  return newUser;
};

export default update;
