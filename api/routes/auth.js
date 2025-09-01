const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: 'Credenciais inválidas' });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h', algorithm: 'HS256' }
    );

    return res.json({
      success: true,
      message: `Bem-vindo(a), ${user.firstName}! Login realizado com sucesso.`,
      data: { token }
    });
  } catch (err) {
    console.error('AUTH_ERROR:', err);
    return res.status(500).json({
      success: false,
      message: 'Ocorreu um erro ao tentar efetuar login. Por favor, tente novamente mais tarde.'
    });
  }
});

module.exports = router;
