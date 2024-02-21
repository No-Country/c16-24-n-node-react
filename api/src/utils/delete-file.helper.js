const fs = require("fs");

const deleteFile = (fileName) => {
   fs.unlink(`uploads/${fileName}`, (err) => {
    if (err) {
      console.log('Error al borrar (fs) ', err);
    } else {
      console.log("Imagen eliminada del servidor.");
    }
  });
};

module.exports = deleteFile;