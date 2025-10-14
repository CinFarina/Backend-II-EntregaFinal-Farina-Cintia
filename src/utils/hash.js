const bcrypt = require('bcrypt');

const hashPassword = (plain) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plain, salt);
};

const isValidPassword = (user, plain) => {
  if (!user?.password || !plain) return false;
  return bcrypt.compareSync(plain, user.password);
};

module.exports = { hashPassword, isValidPassword };
