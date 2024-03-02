import { APP_PASSWORD, APP_USERNAME, SESSION_KEY } from "../configurations/env.config.js";
import HttpError from "../utils/HttpError.util.js";
import { HTTP_SUCCESS, HTTP_UNAUTHORIZED } from "../utils/constants.util.js";
import jwt from "jsonwebtoken"

class AuthController {
  static async login(req, res, next) {
    const { username, pass } = req.body;
    try {
      if (username === APP_USERNAME && pass === APP_PASSWORD) {
        const token = jwt.sign({ username, pass }, SESSION_KEY, { expiresIn: '30d' });
        console.log(token);
        const response = {
          success: true,
          message: "successfully logged in",
          token
        };
        res.status(HTTP_SUCCESS).json(response);
      } else {
        throw new HttpError("bad credentials", HTTP_UNAUTHORIZED);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
