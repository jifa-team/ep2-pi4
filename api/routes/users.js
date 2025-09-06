const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Swagger docs moved to: api/swagger/users.swagger.js


router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Swagger docs moved to: api/swagger/users.swagger.js
router.get('/:id', getUser, (req, res) => {
  res.json(req.user);
});

// Swagger docs moved to: api/swagger/users.swagger.js
router.post('/', async (req, res) => {
  console.log("BODY RECEBIDO:", req.body);
  const hashedPassword = await bcrypt.hash(req.body.password, 10); // saltRounds = 10
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
    cpf: req.body.cpf,
    address: req.body.address
  });

  try {
    const newUser = await user.save();
    res.status(201).json({ message: "Usuário criado:", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Swagger docs moved to: api/swagger/users.swagger.js
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.firstName != null) req.user.firstName = req.body.firstName;
  if (req.body.lastName != null) req.user.lastName = req.body.lastName;
  if (req.body.email != null) req.user.email = req.body.email;
  if (req.body.password != null) {
  req.user.password = await bcrypt.hash(req.body.password, 10);
  }
  if (req.body.phone != null) req.user.phone = req.body.phone;
  if (req.body.cpf != null) req.user.cpf = req.body.cpf;
  if (req.body.address != null) req.user.address = req.body.address;

  try {
    const updatedUser = await req.user.save();
    res.json({ message: "Usuário atualizado com sucesso", user: updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Swagger docs moved to: api/swagger/users.swagger.js
router.delete('/:id', getUser, async (req, res) => {
  try {
    await req.user.deleteOne();
    res.json({ message: "Usuário deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
