import userService from "./userService";
import albumService from "./albumService";
import photoService from "./photoService";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000/api/";

const userServiceLogic = new userService(`${BASE_URL}users`);

const albumServiceLogic = new albumService(`${BASE_URL}albums`);

const photoServiceLogic = new photoService(`${BASE_URL}photos`);

export { userServiceLogic, albumServiceLogic, photoServiceLogic };
