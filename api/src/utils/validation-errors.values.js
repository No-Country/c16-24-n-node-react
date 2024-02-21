const validationErrorMessages = {
  general: "Valor no válido",
  notEmpty: "Campo obligatorio",
  isEmail: "Email no válido",
  usedEmail: "El correo electrónico proporcionado ya está en uso.",
  usedUsername: "El nombre de usuario ya está en uso.",
  lengthMinMax: (min, max) => `Debe tener entre ${min} y ${max} caracteres`,
  imageMimes: "Only JPG, PNG, SVG and WEBP files are allowed.",
  fileSize: (size) => `File size exceeds the limit${size?' of '+ size+'Mb' : undefined}`
};

const responseMessages = {
  userNotRegistered: "Usuario no registrado.",
  notValidCredentials: "Email o contraseña no válidos.",
  noJwt: "Token de acceso no proporcionado",
  invalidJwt: "Token de acceso inválido",
};

module.exports = { validationErrorMessages, responseMessages };
