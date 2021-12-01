/** @format */

export const badReQuestHandler = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send({ message: err.message, errorsList: err.errorsList }); // If error add the error to the errorsList array
  } else {
    next(err);
  }
};
export const unAuthorizedHandler = (err, req, res, next) => {
  if (err.status === 401) {
    res.status(401).send({ message: err.message });
  } else {
    next(err);
  }
};
export const notFoundHandler = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ message: err.message });
  } else {
    next(err);
  }
};
export const genericErrorHandler = (err, req, res, next) => {
  res.status(500).send({ message: "Server Error" });
};
