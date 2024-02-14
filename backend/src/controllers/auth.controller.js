import {
  APP_PASSWORD,
  APP_USERNAME,
  COOKIE_VALUE,
} from "../configurations/env.config.js";
import HttpError from "../utils/HttpError.util.js";
import { HTTP_SUCCESS, HTTP_UNAUTHORIZED } from "../utils/constants.util.js";

class AuthController {
  static async login(req, res, next) {
    const { username, pass } = req.body;
    try {
      if (username === APP_USERNAME && pass === APP_PASSWORD) {
        res.cookie("sessionId", COOKIE_VALUE, {
          httpOnly: false,
          secure: false,
        });
        const response = {
          success: true,
          message: "successfully logged in",
        };
        res.status(HTTP_SUCCESS).json(response);
      } else {
        throw new HttpError("bad credentials", HTTP_UNAUTHORIZED);
      }
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      res.clearCookie("sessionId");
      const response = {
        success: true,
        message: "successfully logged out",
      };
      res.send(response);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
