import httpStatus from "http-status";
import { ValidationError } from "yup";


 const errorHandler = (
  error,
  request,
  response,
  next
) => {
  if (error instanceof ValidationError) {
    let errors = {};

    error.inner.forEach((err) => {
      if (err.path) errors[err.path] = err.errors;
    });

    return response.status(400).json({ message: "Erro de validação", errors });
  }

  console.error(error);

  return response.status(500).json({ message: "Erro interno do servidor " });
};

module.exports = {
  errorHandler
}