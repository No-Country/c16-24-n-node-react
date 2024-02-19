const validationErrorMessages = {
  general: "Valor no válido",
  notEmpty: "Campo obligatorio",
  isEmail: "Email no válido",
  namesLenght: "Debe tener entre 2 y 12 caracteres",
  passLenght: "Debe tener entre 10 y 24 caracteres",
  usedEmail: "El correo electrónico proporcionado ya está en uso.",
  usedUsername: "El nombre de usuario ya está en uso.",
  lengthMinMax: (min, max) => `Debe tener entre ${min} y ${max} caracteres`,
};

const responseMessages = {
  userNotRegistered: "Usuario no registrado.",
  notValidCredentials: "Email o contraseña no válidos.",
  noJwt: "Token de acceso no proporcionado",
  invalidJwt: "Token de acceso inválido",
};

module.exports = { validationErrorMessages, responseMessages };
