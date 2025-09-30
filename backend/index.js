import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./db.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// 🔹 Configura __dirname no ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Inicializar Banco de Dados
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        senha VARCHAR(200) NOT NULL
      );
    `);
    console.log("✅ Tabela 'usuarios' verificada/criada com sucesso.");
  } catch (err) {
    console.error("❌ Erro ao criar tabela:", err);
  }
}
initDB();

// -------------------------
// Rotas da API
// -------------------------

// Rota inicial da API
app.get("/api", (req, res) => {
  res.json({ mensagem: "Bem-vindo à minha API com Node.js e PostgreSQL!" });
});

// Rota que retorna lista de usuários (GET)
app.get("/api/usuarios", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    res.status(500).json({ erro: "Erro ao buscar usuários" });
  }
});

// Rota que cria um usuário (POST)
app.post("/api/usuarios", async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, senha]
    );
    res
      .status(201)
      .json({ mensagem: "Usuário criado com sucesso!", usuario: result.rows[0] });
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    res.status(500).json({ erro: "Erro ao criar usuário" });
  }
});

// -------------------------
// Servir Frontend React
// -------------------------

// Aqui usamos a pasta correta do frontend
app.use(
  express.static(path.join(__dirname, "Gestaoestetica", "dist"))
);

// Fallback
