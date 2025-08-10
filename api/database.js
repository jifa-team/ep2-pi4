const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/jifaodonto'; // Altere para sua URI se usar Atlas ou outro host

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB!');
});

module.exports = db;