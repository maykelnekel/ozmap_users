import users from "../database/index.js";

const findUserIndex = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index >= 0) {
    return index;
  } else {
    return false;
  }
};

export default findUserIndex;
