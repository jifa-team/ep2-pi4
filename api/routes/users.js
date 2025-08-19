const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        //erro no servidor
        res.status(500).json({ message: error.message });
    }
});


router.get('/:id', getUser, (req, res) => {
    res.json(req.user);
});

router.post('/', async(req, res) => {
    console.log("BODY RECEBIDO:", req.body);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        cpf: req.body.cpf,
        address: req.body.address
    });

    try {
        const newUser = await user.save();
        res.status(201).json({ message: "Usuário criado:", user: newUser });
    } catch (error) {
        //erro no lado do cliente, faltou algum dado
        res.status(400).json({ message: error.message });
    }
});


router.patch('/:id', getUser, async (req, res) => {
    if (req.body.firstName != null) {
        req.user.firstName = req.body.firstName;
    }
    if (req.body.lastName != null) {
        req.user.lastName = req.body.lastName;
    }
    if (req.body.email != null) {
        req.user.email = req.body.email;
    }
    if (req.body.password != null) {
        req.user.password = req.body.password;
    }
    if (req.body.phone != null) {
        req.user.phone = req.body.phone;
    }
    if (req.body.cpf != null) {
        req.user.cpf = req.body.cpf;
    }
    if (req.body.address != null) {
        req.user.address = req.body.address;
    }
    try {
        const updatedUser = await req.user.save();
        res.json({ message: "Usuário atualizado com sucesso", user: updatedUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.delete('/:id', getUser, async (req, res) => {
    try {
        await req.user.deleteOne()
        res.json({ message: "Usuário deletado com sucesso" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        // se não existir usuario manda mensagem de usuario nao encontrado
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = router