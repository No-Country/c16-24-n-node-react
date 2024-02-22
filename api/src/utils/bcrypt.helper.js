const bcrypt = require("bcrypt");
const { responseMessages } = require("./validation-errors.values");

const passwordHash = async (password) => {
  const salt = bcrypt.genSaltSync();
  return await bcrypt.hash(password, salt);
};

const compareHash = async (data, hash, resMessage) => {
  const isValid = await bcrypt.compare(data, hash);
  if (!isValid) {
    throw { status: 400, msg: resMessage || responseMessages.invalidPassword };
  }
};

module.exports = { passwordHash, compareHash };
