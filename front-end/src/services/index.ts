import userService from "./userService";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000/api/";

const userServiceLogic = new userService(`${BASE_URL}users`);

export { userServiceLogic };
