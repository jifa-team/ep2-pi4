require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true,});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão:'));
db.once('open', () => {
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
});


const usersRouter = require('./routes/users');
app.use('/users', usersRouter);


app.listen(3000, () => console.log("Server Started"));
