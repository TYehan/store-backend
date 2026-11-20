// DEMO ONLY - paste into a scratch copy of server.js, never share as a solution.
app.get('/api/unsafe/products/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ' + req.params.id);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Attack:  curl "http://localhost:3000/api/unsafe/products/1%20OR%201=1"
// Safe version: /api/products/:id  (uses the ? placeholder)
