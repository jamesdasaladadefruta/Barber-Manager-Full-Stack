// db.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("✅ Conectado ao banco de dados");
});

pool.on("error", (err) => {
  console.error("❌ Erro no pool do banco:", err);
});

export default pool;
