const bcrypt = require('bcrypt');

// 🔒 Hashea la contraseña correctamente
const hashPassword = (plain) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plain, salt);
};

// ✅ Compara la contraseña ingresada con la guardada
const isValidPassword = (user, plain) => {
  if (!user?.password || !plain) return false;
  return bcrypt.compareSync(plain, user.password);
};

module.exports = { hashPassword, isValidPassword };
