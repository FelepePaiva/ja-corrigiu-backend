
import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import './models/associations.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API rodando...');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);

});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
}

testConnection();
