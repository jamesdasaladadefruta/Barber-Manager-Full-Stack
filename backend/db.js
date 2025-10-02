// db.js
import pkg from "pg";
import dotenv from "dotenv";
DATABASE_URL='postgresql://postgres:flwodFMJlcGwUrLTeNCaAWlWzmsVUqDP@postgres.railway.internal:5432/railway'      
dotenv.config();

const { Pool } = pkg;

// Configuração do pool para Railway
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
