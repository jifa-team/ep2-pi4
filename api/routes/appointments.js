const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
// Swagger docs moved to: api/swagger/appointments.swagger.js
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('userId', 'firstName lastName email');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Swagger docs moved to: api/swagger/appointments.swagger.js
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

// Swagger docs moved to: api/swagger/appointments.swagger.js
router.get('/:id', getAppointment, (req, res) => {
    res.json(res.appointment);
});

// Swagger docs moved to: api/swagger/appointments.swagger.js
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

// Swagger docs moved to: api/swagger/appointments.swagger.js
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
