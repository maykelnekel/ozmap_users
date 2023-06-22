import users from "../../database/index.js";

const delet = (index) => {
  users.splice(index, 1);
  return true;
};

export default delet;
