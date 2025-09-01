const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gerenciamento de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - cpf
 *       properties:
 *         id:
 *           type: string
 *           description: ID do usuário
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         phone:
 *           type: string
 *         cpf:
 *           type: string
 *         address:
 *           type: object
 *           properties:
 *             street: { type: string }
 *             complement: { type: string }
 *             city: { type: string }
 *             state: { type: string }
 *             cep: { type: string }
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */


router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', getUser, (req, res) => {
  res.json(req.user);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro nos dados enviados
 */
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

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Atualiza um usuário existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Usuário não encontrado
 */
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

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
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
