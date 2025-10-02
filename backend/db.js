const { Pool } = require("pg");

require("dotenv").config();

// Configuração do pool para Railway
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // URL do banco fornecida pelo Railway
  ssl: {
    rejectUnauthorized: false, // necessário para conexões SSL no Railway
  },
});

module.exports = pool;
