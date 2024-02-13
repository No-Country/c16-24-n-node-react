const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const server = express();

// Configuración de Morgan para el registro de solicitudes HTTP
server.use(morgan("dev"));

// Ruta de ejemplo
server.get("/", (req, res) => {
  res.send("¡Hola mundo desde Express!");
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
