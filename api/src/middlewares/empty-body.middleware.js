function isEmptyBody(body) {
  return Object.keys(body).length === 0;
}

const emptyBodyValidator = (req, res, next) => {
  if (isEmptyBody(req.body)) {
    return res.status(400).json({ ok: false, message: "Nothing to do" });
  }
  next();
};

module.exports = emptyBodyValidator;
