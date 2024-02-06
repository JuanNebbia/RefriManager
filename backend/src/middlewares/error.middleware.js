import { HTTP_INTERNAL_SERVER_ERROR } from "../utils/constants.util.js";

const errorMiddleware = (error, req, res, next) => {
  console.log("ERROR => ", error);
  res.status(error.status || HTTP_INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: error.message || "Internal Server Error",
  });
};

export default errorMiddleware;
