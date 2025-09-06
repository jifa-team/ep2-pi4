require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { swaggerUi, specs } = require("./swagger");

const app = express();
app.use(express.json());
// Allow requests from the frontend dev server
app.use(cors({ origin: 'http://localhost:5173' }));

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