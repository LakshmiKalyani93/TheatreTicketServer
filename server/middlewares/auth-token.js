module.exports = () => {
  const _ = require("underscore");
  return (req, res, next) => {
    const error = new Error();
    error.statusCode = 401;
    if (req.headers && !_.isEmpty(req.headers.authtoken)) {
      if (req.headers.authtoken === '{m6"gL:+9GfH!NdE') {
        return next();
      }
      error.message = "unauthorized";
      return next(error);
    }
    error.message = "authToken is required";
    return next(error);
  };
};
