// db.js
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
// Testa a conexão
export async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Conectado ao banco com sucesso!");
    console.log("📅 Data/hora no Postgres:", res.rows[0].now);
  } catch (err) { 
    console.error("❌ Erro ao conectar no banco:", err);
  }
}
