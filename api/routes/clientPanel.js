const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); 
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const ClientPanel = require('../models/ClientPanel');
const Notification = require('../models/Notification'); 


// Middleware de autenticação
const verificarAutenticacao = (req, res, next) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ erro: 'Não autenticado: token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ erro: 'Não autorizado: token inválido' });
    }
    req.user = user;
    next();
  });
};

// 1. Últimas Atividades 
router.get('/atividades/:userId', verificarAutenticacao, async (req, res) => {
  try {
    const userId = req.params.userId;

    const lastAppointment = await Appointment.findOne({ userId }).sort({ date: -1 });
    const clientPanel = await ClientPanel.findOne({ userId }).select('lastAccess');

    const ultimasAtividades = [
      { tipo: 'consulta', data: lastAppointment ? lastAppointment.date : null },
      { tipo: 'fatura', data: clientPanel ? clientPanel.lastAccess : 'Não disponível' },
      { tipo: 'prescricao', data: 'Não disponível' }
    ];

    res.json(ultimasAtividades);
  } catch (erro) {
    console.error('Erro em /atividades:', erro); 
    res.status(500).json({ erro: 'Erro ao buscar atividades' });
  }
});

router.get('/consultas/ultimas/:userId', verificarAutenticacao, async (req, res) => {
  try {
    const userId = req.params.userId;
    const consulta = await Appointment.findOne({ userId }).sort({ date: -1 });
    res.json(consulta ? [consulta] : []);
  } catch (erro) {
    console.error('Erro em /consultas/ultimas:', erro);
    res.status(500).json({ erro: 'Erro ao buscar consultas' });
  }
});

// 2. Agendamentos
router.get('/agendamentos/:userId', verificarAutenticacao, async (req, res) => {
  try {
    const userId = req.params.userId;
    const agendamentos = await Appointment.find({ userId });
    res.json(agendamentos);
  } catch (erro) {
    console.error('Erro em /agendamentos GET:', erro);
    res.status(500).json({ erro: 'Erro ao buscar agendamentos' });
  }
});

router.post('/agendamentos', verificarAutenticacao, async (req, res) => {
  try {
    const { userId, date, time, notes } = req.body;
    if (!userId || !date || !time) return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
    const novoAgendamento = new Appointment({ userId, date, time, notes });
    const saved = await novoAgendamento.save();
    res.status(201).json(saved);
  } catch (erro) {
    console.error('Erro em /agendamentos POST:', erro);
    res.status(500).json({ erro: 'Erro ao criar agendamento' });
  }
});

router.put('/agendamentos/:id', verificarAutenticacao, async (req, res) => {
  try {
    const { date, time, notes } = req.body;
    const agendamento = await Appointment.findByIdAndUpdate(req.params.id, { date, time, notes }, { new: true });
    if (!agendamento) return res.status(404).json({ erro: 'Agendamento não encontrado' });
    res.json(agendamento);
  } catch (erro) {
    console.error('Erro em /agendamentos PUT:', erro);
    res.status(500).json({ erro: 'Erro ao atualizar agendamento' });
  }
});

router.delete('/agendamentos/:id', verificarAutenticacao, async (req, res) => {
  try {
    const agendamento = await Appointment.findByIdAndDelete(req.params.id);
    if (!agendamento) return res.status(404).json({ erro: 'Agendamento não encontrado' });
    res.json({ sucesso: 'Agendamento cancelado' });
  } catch (erro) {
    console.error('Erro em /agendamentos DELETE:', erro);
    res.status(500).json({ erro: 'Erro ao cancelar agendamento' });
  }
});

// 3. Histórico
router.get('/historico/:userId', verificarAutenticacao, async (req, res) => {
  try {
    const userId = req.params.userId;
    const historico = await Appointment.find({ userId }).select('date time notes');
    res.json(historico);
  } catch (erro) {
    console.error('Erro em /historico:', erro);
    res.status(500).json({ erro: 'Erro ao buscar histórico' });
  }
});

// 4. Prontuário
router.get('/prontuario/:userId', verificarAutenticacao, async (req, res) => {
  try {
    const userId = req.params.userId;
    const clientPanel = await ClientPanel.findOne({ userId }).select('preferences lastAccess historico');
    if (!clientPanel) return res.status(404).json({ erro: 'Prontuário não encontrado' });
    res.json(clientPanel);
  } catch (erro) {
    console.error('Erro em /prontuario:', erro);
    res.status(500).json({ erro: 'Erro ao buscar prontuário' });
  }
});

// 7. Notificações
router.get('/notificacoes/:userId', verificarAutenticacao, async (req, res) => {
  try {
    const userId = req.params.userId;
    const notificacoes = await Notification.find({ userId });
    res.json(notificacoes);
  } catch (erro) {
    console.error('Erro em /notificacoes GET:', erro);
    res.status(500).json({ erro: 'Erro ao buscar notificações' });
  }
});

router.put('/notificacoes/:id/lida', verificarAutenticacao, async (req, res) => {
  try {
    const userId = req.body.userId;
    const notificacao = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId },
      { lida: true },
      { new: true }
    );
    if (!notificacao) return res.status(404).json({ erro: 'Notificação não encontrada' });
    res.json({ sucesso: 'Notificação marcada como lida' });
  } catch (erro) {
    console.error('Erro em /notificacoes PUT:', erro);
    res.status(500).json({ erro: 'Erro ao marcar notificação' });
  }
});

module.exports = router;