require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { swaggerUi, specs } = require("./swagger");

const app = express();
app.use(express.json());
app.use(cors());

// 🔗 Conexão com banco de dados
/* 
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão:'));
db.once('open', () => {
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
});
*/

require('./database');

// 📌 Rotas
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const appointmentsRouter = require('./routes/appointments');
app.use('/appointments', appointmentsRouter);

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const clientPanelRouter = require('./routes/clientPanel');
app.use('/client-panel', clientPanelRouter);

// 📖 Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// 🚀 Start server
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
  console.log("Swagger disponível em http://localhost:3000/api-docs");
});
module.exports = app;