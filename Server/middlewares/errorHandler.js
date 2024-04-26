function errorHandler(err, req, res, next) {
  let status = err.status;
  let message = err.message;
  switch (err.name) {
    case "invalid input":
      status = 400;
      message = "Username/ email/ passwword cannot be empty";
      break;
    case "Add Card Error":
      status = 400;
      message = "Card Exceed Limit";
      break;
    case "Increment Error":
      status = 400;
      message = "Maximum 4 same card in deck";
      break;
    case "Decrement Error":
      status = 400;
      message = "Minimum card in deck is one, please delete the card";
      break;
    case "invalid user":
      status = 401;
      message = "Error login user not found / password not matched";
      break;
    case "NotFound":
      status = 404;
      message = "Error not found";
      break;
    case "Invalid Token":
      status = 401;
      message = "Error Authentication";
      break;
    case "JsonWebTokenError":
      status = 401;
      message = "Error Authentication";
      break;
    case "Forbidden":
      status = 403;
      message = "Forbidden error authorization";
      break;
    case "SequelizeValidationError":
      status = 400;
      message = err.errors.map((err) => err.message);
      break;
    case "ValidationErrorItem":
      status = 400;
      message = err.errors.map((err) => err.message);
      break;
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors.map((err) => err.message);
      break;
    case "FileRequired":
      status = 400;
      message = "File is required";
      break;
    default:
      status = 500;
      message = "Internal Server Error";
      break;
  }
  console.log(err.name);
  res.status(status).json({ message });
}

module.exports = errorHandler;
