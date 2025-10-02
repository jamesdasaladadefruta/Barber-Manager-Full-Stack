// db.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// Detecta se está em produção (Railway) ou desenvolvimento (localhost)
const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

pool.on("connect", () => {
  console.log("✅ Conectado ao banco de dados");
});

pool.on("error", (err) => {
  console.error("❌ Erro no pool do banco:", err);
});

// export default pool;

