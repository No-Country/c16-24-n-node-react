const multer = require("multer");
const { uploadMulter } = require("../utils/cloudinary.helper");
const {
  validationErrorMessages,
} = require("../utils/validation-errors.values");

const MIME_TYPES = ["image/jpeg", "image/png", "image/svg+xml", "image/webp"];
const MAX_SIZE_MB = 1;

const imageValidator = (req, res, next) => {
  uploadMulter.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: validationErrorMessages.fileSize });
      } else {
        console.error(`Multer error: ${err.message}`);
        return res
          .status(500)
          .json({ error: "Internal server error (multer)" });
      }
    } else if (err) {
      console.error(`Server error: ${err.message}`);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!req.file) {
      return res.status(400).json({
        ok: false,
        errors: {
          image: {
            msg: validationErrorMessages.notEmpty,
          },
        },
      });
    }

    if (!MIME_TYPES.includes(req.file.mimetype)) {
      return res
        .status(400)
        .json({
            ok: false,
            errors: {
              image: {
                msg: validationErrorMessages.imageMimes,
              },
            },
          });
    }

    const maxSize = MAX_SIZE_MB * 1024 * 1024;
    if (req.file.size > maxSize) {
      return res
        .status(400)
        .json({
            ok: false,
            errors: {
              image: {
                msg: validationErrorMessages.fileSize(MAX_SIZE_MB),
              },
            },
          });
    }

    next();
  });
};

module.exports = imageValidator;
