const asyncHandler = (requestHandler) => {
  return () => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      next(error);
    });
  };
};
export default asyncHandler;
