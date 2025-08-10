const express = require('express');
const cors = require('cors');

// Conexão com o banco
require('./database');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas de exemplo (adicione as reais depois)
app.get('/', (req, res) => {
  res.send('API JifaOdonto rodando!');
});

// Exporte as rotas reais aqui, ex: app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});