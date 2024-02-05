const errorMiddleware = (error, req, res, next) => {
  console.log("ERROR => ", error);
  res.status(error.status || 500).json({
    status: "error",
    message: error.message || "Internal Server Error",
  });
};

export default errorMiddleware;
