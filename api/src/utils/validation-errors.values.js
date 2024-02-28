const validationErrorMessages = {
  general: "Valor no válido",
  notEmpty: "Campo obligatorio",
  isEmail: "Email no válido",
  usedEmail: "El correo electrónico proporcionado ya está en uso.",
  usedUsername: "El nombre de usuario ya está en uso.",
  lengthMinMax: (min, max) => `Debe tener entre ${min} y ${max} caracteres`,
  imageMimes: "Only JPG, PNG, SVG and WEBP files are allowed.",
  fileSize: (size) =>
    `File size exceeds the limit${size ? " of " + size + "Mb" : undefined}`,
  passwordMismatch: "Las contrseñas no coinciden",
  samePassword: "La nueva contraseña es la misma",
  mustBeInt: (min, max) =>
    `Debe ser un entero. ${min ? "Mínimo: " + min : undefined} ${
      max ? "Máximo: " + max : ""
    }`,
  notUUID: "Not valid UUID",
};

const responseMessages = {
  userNotRegistered: "Usuario no registrado.",
  notValidCredentials: "Email o contraseña no válidos.",
  noJwt: "Token de acceso no proporcionado",
  invalidJwt: "Token de acceso inválido",
  invalidPassword: "Mal password",
  updatedPassword: "Contraseña actualizada correctamente",
  internalServerError: "Internal server error",
  updatedEmail: "Correo electrónico actualizado correctamente",
  updatedUserName: "Nombre de usuario actualizado correctamente",
  blockEmailUpdate:
    "No puede cambiar su email sin antes configurar una contraseña",
  cantFollowYou: "No puedes seguirte a ti mismo",
  alreadyFollowing: "Ya sigues a este usuario",
  notFollowing: "No estás siguiendo a ese usuario",
  followAdded: "Usuario seguido exitosamente",
  followRemoved: "Dejaste de seguir a este usuario",
  notFoundOrBanned: "Usuario no encontrado o baneado",
};

module.exports = { validationErrorMessages, responseMessages };
