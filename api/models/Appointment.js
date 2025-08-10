const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date:     { type: Date, required: true },
  time:     { type: String, required: true },
  status:   { type: String, enum: ['agendado', 'cancelado', 'realizado'], default: 'agendado' },
  notes:    String
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
