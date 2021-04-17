module.exports = (message, data = null, statusCode = null, code = null) => {
  const error = new Error(message);
  if (data) {
    error.data =
      data instanceof Error
        ? JSON.parse(JSON.stringify(data, Object.getOwnPropertyNames(data)))
        : data;
  }

  if (statusCode) {
    error.statusCode = statusCode;
  }

  if (error.stack) {
    delete error.stack;
  }

  if (error.details) {
    delete error.details;
  }

  if (code) {
    error.code = code;
  }

  return error;
};
