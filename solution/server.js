const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

// ---------- Products ----------
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  const { product_name, category, price, stock } = req.body;
  if (!product_name || !category || price === undefined || price === '') {
    return res.status(400).json({ error: 'product_name, category and price are required' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO products (product_name, category, price, stock) VALUES (?, ?, ?, ?)',
      [product_name, category, price, stock ?? 10]
    );
    res.status(201).json({ id: result.insertId, product_name, category, price, stock: stock ?? 10 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------- Customers ----------
app.get('/api/customers', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM customers');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/customers', async (req, res) => {
  const { full_name, email, city } = req.body;
  if (!full_name?.trim() || !email?.trim() || !city?.trim()) {
    return res.status(400).json({ error: 'full_name, email and city are required' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO customers (full_name, email, city) VALUES (?, ?, ?)',
      [full_name, email, city]
    );
    res.status(201).json({ id: result.insertId, full_name, email, city });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
