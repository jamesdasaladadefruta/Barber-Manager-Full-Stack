// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js"; // importa o pool configurado no db.js

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste (para verificar se API está funcionando)
app.get("/", (req, res) => {
  res.send("🚀 Backend está rodando!");
});

// Rota de teste para o banco
app.get("/db-check", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "ok",
      time: result.rows[0].now,
    });
  } catch (err) {
    console.error("❌ Erro no banco:", err);
    res.status(500).json({ error: "Erro ao conectar no banco" });
  }
});

// Porta (Railway injeta automaticamente em process.env.PORT)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});