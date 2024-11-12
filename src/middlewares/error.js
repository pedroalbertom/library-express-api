const ApiError = require("../classes/api-errors");
const { ValidationError, UniqueConstraintError, ForeignKeyConstraintError } = require("sequelize");
// const { MulterError } = require("multer");

const errorHandler = (error, req, res, next) => {
  const handler = errorHandlerMap.get(error.constructor);

  if (handler) return handler(error, res);

  // Erro desconhecido
  console.log(error.constructor);
  console.log(error);
  return res.status(500).json({ msg: error.message });
};

const errorHandlerMap = new Map([
  [ApiError, handleApiError],
  [ValidationError, handleValidationError],
  [UniqueConstraintError, handleUniqueConstraintError],
  [ForeignKeyConstraintError, handleForeignKeyConstraintError],
//   [MulterError, handleMulterError],
]);

function handleApiError(error, res) {
  res.status(error.statusCode).json({ msg: error.message });
}

function handleValidationError(error, res) {
  res.status(422).json({ msg: error.message });
}

function handleUniqueConstraintError(error, res) {
  res.status(409).json({ msg: error.parent.sqlMessage });
}

function handleForeignKeyConstraintError(error, res) {
  res.status(404).json({
    msg: "Linha referenciada não encontrada",
    ref_table: error.table,
    id_value: error.value,
  });
}

// function handleMulterError(error, res) {
//   const limit = error.field === "quadro" ? "250" : "50";
//   res.status(413).json({ msg: `Arquivo enviado não pode ser maior que ${limit}MB` });
// }

module.exports = errorHandler;
