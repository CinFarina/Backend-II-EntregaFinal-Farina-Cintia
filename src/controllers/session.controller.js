const UserRepository = require('../repositories/UserRepository');
const { isValidPassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

const userRepo = new UserRepository();

const registerUser = async (req, res) => {
  try {
    const userData = req.body;

    const existingUser = await userRepo.getByEmail(userData.email);
    if (existingUser) {
      return res.status(400).json({ status: 'error', message: 'El email ya está registrado' });
    }

    const user = await userRepo.register(userData);

    res.status(201).json({
      status: 'success',
      message: 'Usuario registrado correctamente',
      user,
    });
  } catch (err) {
    console.error('Error en registerUser:', err);
    res.status(400).json({ status: 'error', message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userRepo.getByEmail(email);

    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Usuario no encontrado' });
    }

    const userObj = user.toObject ? user.toObject() : user;

    const passwordIsValid = isValidPassword(userObj, password);
    if (!passwordIsValid) {
      return res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
    }

    const token = generateToken({
      id: userObj._id,
      email: userObj.email,
      role: userObj.role
    });

    res.json({
      status: 'success',
      message: 'Login exitoso',
      token
    });
  } catch (err) {
    console.error('Error en loginUser:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

module.exports = { registerUser, loginUser };
