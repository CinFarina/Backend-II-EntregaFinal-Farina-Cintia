const UserDTO = require('../dto/UserDTO');

const getCurrent = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ status: 'error', message: 'No autenticado' });
  }
  const userDTO = new UserDTO(req.user);
  res.json({ status: 'success', user: userDTO });
};

module.exports = { getCurrent };
