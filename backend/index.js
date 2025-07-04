const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.POSTGRES_USER || 'appuser',
  password: process.env.POSTGRES_PASSWORD || 'secret',
  database: process.env.POSTGRES_DB || 'appdb',
  port: 5432,
});

const app = express();
app.use(cors(), express.json());

app.get('/items', async (req, res) => {
  const result = await pool.query('SELECT id, text FROM items ORDER BY id');
  res.json(result.rows);
});

app.post('/items', async (req, res) => {
  const { text } = req.body;
  const result = await pool.query(
    'INSERT INTO items(text) VALUES($1) RETURNING id, text',
    [text]
  );
  res.status(201).json(result.rows[0]);
});

// Crée la table au démarrage si nécessaire
(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      text TEXT NOT NULL
    );
  `);
})();

const PORT = 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
