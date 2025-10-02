// db.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// Configuração do pool para Railway
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
     ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  },
});

export default pool;
