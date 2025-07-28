const express = require('express');
const router = express.Router();

// Handle `Produk` CRUD
router.get('/produk', async (req, res) => {
  try {
    const [results] = await req.pool.query('SELECT * FROM Produk');
    res.json(results);
  } catch (error) {
    console.error('Error fetching Produk:', error);
    res.status(500).send('Internal server error');
  }
});

router.post('/produk', async (req, res) => {
  const { nama, deskripsi, harga } = req.body;
  try {
    const [result] = await req.pool.query(
      'INSERT INTO Produk (nama, deskripsi, harga) VALUES (?, ?, ?)',
      [nama, deskripsi, harga]
    );
    res.status(201).json({ id: result.insertId, nama, deskripsi, harga });
  } catch (error) {
    console.error('Error creating Produk:', error);
    res.status(500).send('Internal server error');
  }
});

router.put('/produk/:id', async (req, res) => {
  const { id } = req.params;
  const { nama, deskripsi, harga } = req.body;
  try {
    await req.pool.query(
      'UPDATE Produk SET nama = ?, deskripsi = ?, harga = ? WHERE id = ?',
      [nama, deskripsi, harga, id]
    );
    res.status(200).send('Produk updated successfully');
  } catch (error) {
    console.error('Error updating Produk:', error);
    res.status(500).send('Internal server error');
  }
});

router.delete('/produk/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await req.pool.query('DELETE FROM Produk WHERE id = ?', [id]);
    res.status(200).send('Produk deleted successfully');
  } catch (error) {
    console.error('Error deleting Produk:', error);
    res.status(500).send('Internal server error');
  }
});

// Handle `Stock` CRUD
router.get('/stock', async (req, res) => {
  try {
    const [results] = await req.pool.query('SELECT * FROM Stock');
    res.json(results);
  } catch (error) {
    console.error('Error fetching Stock:', error);
    res.status(500).send('Internal server error');
  }
});

router.post('/stock', async (req, res) => {
  const { produk_id, kuantitas } = req.body;
  try {
    const [result] = await req.pool.query(
      'INSERT INTO Stock (produk_id, kuantitas) VALUES (?, ?)',
      [produk_id, kuantitas]
    );
    res.status(201).json({ id: result.insertId, produk_id, kuantitas });
  } catch (error) {
    console.error('Error creating Stock:', error);
    res.status(500).send('Internal server error');
  }
});

router.put('/stock/:id', async (req, res) => {
  const { id } = req.params;
  const { produk_id, kuantitas } = req.body;
  try {
    await req.pool.query(
      'UPDATE Stock SET produk_id = ?, kuantitas = ? WHERE id = ?',
      [produk_id, kuantitas, id]
    );
    res.status(200).send('Stock updated successfully');
  } catch (error) {
    console.error('Error updating Stock:', error);
    res.status(500).send('Internal server error');
  }
});

router.delete('/stock/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await req.pool.query('DELETE FROM Stock WHERE id = ?', [id]);
    res.status(200).send('Stock deleted successfully');
  } catch (error) {
    console.error('Error deleting Stock:', error);
    res.status(500).send('Internal server error');
  }
});

// Handle `Pembelian` CRUD
router.get('/pembelian', async (req, res) => {
  try {
    const [results] = await req.pool.query('SELECT * FROM Pembelian');
    res.json(results);
  } catch (error) {
    console.error('Error fetching Pembelian:', error);
    res.status(500).send('Internal server error');
  }
});

router.post('/pembelian', async (req, res) => {
  const { produk_id, kuantitas, status } = req.body;
  try {
    const [result] = await req.pool.query(
      'INSERT INTO Pembelian (produk_id, kuantitas, status) VALUES (?, ?, ?)',
      [produk_id, kuantitas, status]
    );
    res.status(201).json({ id: result.insertId, produk_id, kuantitas, status });
  } catch (error) {
    console.error('Error creating Pembelian:', error);
    res.status(500).send('Internal server error');
  }
});

router.put('/pembelian/:id', async (req, res) => {
  const { id } = req.params;
  const { produk_id, kuantitas, status } = req.body;
  try {
    await req.pool.query(
      'UPDATE Pembelian SET produk_id = ?, kuantitas = ?, status = ? WHERE id = ?',
      [produk_id, kuantitas, status, id]
    );
    res.status(200).send('Pembelian updated successfully');
  } catch (error) {
    console.error('Error updating Pembelian:', error);
    res.status(500).send('Internal server error');
  }
});

router.delete('/pembelian/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await req.pool.query('DELETE FROM Pembelian WHERE id = ?', [id]);
    res.status(200).send('Pembelian deleted successfully');
  } catch (error) {
    console.error('Error deleting Pembelian:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
