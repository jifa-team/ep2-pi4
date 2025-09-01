const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Endpoints para gerenciamento de agendamentos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       required:
 *         - userId
 *         - date
 *         - time
 *       properties:
 *         id:
 *           type: string
 *           description: ID do agendamento
 *         userId:
 *           type: string
 *           description: ID do usuário
 *         date:
 *           type: string
 *           format: date
 *         time:
 *           type: string
 *           description: Hora do agendamento
 *         notes:
 *           type: string
 *           description: Observações adicionais
 *         status:
 *           type: string
 *           description: Status do agendamento
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Lista todos os agendamentos
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: Lista de agendamentos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       500:
 *         description: Erro no servidor
 */
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('userId', 'firstName lastName email');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Cria um novo agendamento
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - date
 *               - time
 *             properties:
 *               userId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Erro nos dados enviados
 */
router.post('/', async (req, res) => {
    const { userId, date, time, notes } = req.body;

    if (!userId || !date || !time) {
        return res.status(400).json({ message: 'Os campos userId, date, e time são obrigatórios.' });
    }

    const appointment = new Appointment({
        userId,
        date,
        time,
        notes
    });

    try {
        const newAppointment = await appointment.save();
        res.status(201).json({ message: "Agendamento criado com sucesso!", appointment: newAppointment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Retorna um agendamento pelo ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Agendamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Agendamento não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get('/:id', getAppointment, (req, res) => {
    res.json(res.appointment);
});

/**
 * @swagger
 * /appointments/{id}:
 *   patch:
 *     summary: Atualiza um agendamento existente
 *     tags: [Appointments]
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
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Agendamento não encontrado
 */
router.patch('/:id', getAppointment, async (req, res) => {
    if (req.body.status != null) res.appointment.status = req.body.status;
    if (req.body.notes != null) res.appointment.notes = req.body.notes;

    try {
        const updatedAppointment = await res.appointment.save();
        res.json({ message: "Agendamento atualizado com sucesso!", appointment: updatedAppointment });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Deleta um agendamento
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Agendamento deletado com sucesso
 *       404:
 *         description: Agendamento não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/:id', getAppointment, async (req, res) => {
    try {
        await res.appointment.deleteOne();
        res.json({ message: "Agendamento deletado com sucesso" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware para encontrar um agendamento pelo ID
async function getAppointment(req, res, next) {
    let appointment;
    try {
        appointment = await Appointment.findById(req.params.id);
        if (appointment == null) {
            return res.status(404).json({ message: 'Não foi possível encontrar o agendamento' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.appointment = appointment;
    next();
}

module.exports = router;
