const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Modelo del usuario

// Registrar un nuevo usuario
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();
    return res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    console.error("Error en login: ", error);
    return res.status(500).json({ message: 'Error al iniciar sesión.', error: error.message });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'your_secret_key', {
      expiresIn: '1h',
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error en login: ", error);
    return res.status(500).json({ message: 'Error al iniciar sesión.', error: error.message });
  }
};
