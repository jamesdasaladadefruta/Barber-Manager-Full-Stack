import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg'; // Importando Pool do pg
dotenv.config();

const { Pool } = pkg; // Extrai Pool do pacote

const app = express();
app.use(express.json());
app.use(cors());

// Configuração do PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,       // Ex.: containers-us-west-123.railway.app
  port: process.env.DB_PORT,       // Ex.: 5432
  user: process.env.DB_USER,       // Ex.: postgres
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,   // Ex.: railway
  ssl: { rejectUnauthorized: false } // Necessário para Railway
});

// Criar tabela de usuários se não existir
const createUsersTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Tabela 'users' criada ou já existente!");
  } catch (err) {
    console.error("Erro ao criar tabela:", err);
  }
};

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

//
