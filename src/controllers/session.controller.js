const UserRepository = require('../repositories/UserRepository');
const { isValidPassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

const userRepo = new UserRepository();

// 👉 REGISTRO DE USUARIO
const registerUser = async (req, res) => {
  try {
    const userData = req.body;

    // Verificar si el email ya existe
    const existingUser = await userRepo.getByEmail(userData.email);
    if (existingUser) {
      return res.status(400).json({ status: 'error', message: 'El email ya está registrado' });
    }

    // ❌ NO volvemos a encriptar aquí (ya se hace en UserRepository)
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

// 👉 LOGIN DE USUARIO
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userRepo.getByEmail(email);

    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Usuario no encontrado' });
    }

    // Convertimos el documento de Mongoose a objeto plano (por si acaso)
    const userObj = user.toObject ? user.toObject() : user;

    // Comparamos la contraseña ingresada con la almacenada (hash)
    const passwordIsValid = isValidPassword(userObj, password);
    if (!passwordIsValid) {
      return res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
    }

    // Generamos token JWT
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
