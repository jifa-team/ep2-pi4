const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

function sha256(s) {
  return crypto.createHash('sha256').update(s).digest('hex');
}
function isHex64(str) {
  return typeof str === 'string' && /^[a-f0-9]{64}$/i.test(str);
}

router.post('/', async (req, res) => {
  try {
    const { email, password: raw } = req.body;
    if (!email || !raw) return res.status(400).json({ message: 'Email e senha são obrigatórios' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

    const hashedInput = sha256(raw);
    let ok = false;

    if (isHex64(user.password)) {
      ok = (user.password === hashedInput);
    } else {
      ok = (user.password === raw);
      if (ok) {
        user.password = hashedInput;
        await user.save();
      }
    }

    if (!ok) return res.status(401).json({ message: 'Credenciais inválidas' });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } catch (err) {
    console.error('AUTH_ERROR:', err);
    return res.status(500).json({ message: 'Erro no login' });
  }
});

module.exports = router;
