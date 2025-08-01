
import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import './models/associations.js';
import { errorHandler } from './middleware/error.middleware.js';
import studentRoutes from './routes/StudentRoutes.js';
import examRoutes from './routes/ExamRoutes.js';
import answerRoutes from './routes/AnswerRoutes.js';
import classRoutes from './routes/ClassRoutes.js';
import teacherRoutes from './routes/TeacherRoutes.js';
import adminRoutes from './routes/AdminRoutes.js';
import loginRoutes from './routes/LoginRoutes.js';
import disciplineRoutes from './routes/DisciplineRoute.js';
import cors from 'cors'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
//app.use - routes
app.use('/v1', studentRoutes);
app.use('/v1', examRoutes);
app.use('/v1', answerRoutes);
app.use('/v1', classRoutes);
app.use('/v1', adminRoutes);
app.use('/v1', loginRoutes);
app.use('/v1', teacherRoutes);
app.use('/v1', disciplineRoutes); 


app.get('/', (req, res) => {
  res.send('API rodando...');
});
app.use(errorHandler);

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
