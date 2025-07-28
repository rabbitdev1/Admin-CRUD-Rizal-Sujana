const mysql = require('mysql2/promise');

const ConnectDB = async () => {
  let pool;
  const maxAttempts = 10;

  for (let i = 0; i < maxAttempts; i++) {
    try {
      pool = await mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });

      // Tes koneksi
      await pool.query('SELECT 1');
      console.log('✅ Berhasil konek ke database.');

      // Buat tabel Produk
      await pool.query(`
        CREATE TABLE IF NOT EXISTS Produk (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nama VARCHAR(100) NOT NULL,
          deskripsi TEXT,
          harga DECIMAL(10, 2) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB;
      `);
      console.log('✅ Tabel Produk sudah dibuat atau sudah ada.');

      // Buat tabel Stock
      await pool.query(`
        CREATE TABLE IF NOT EXISTS Stock (
          id INT AUTO_INCREMENT PRIMARY KEY,
          produk_id INT,
          kuantitas INT NOT NULL,
          FOREIGN KEY (produk_id) REFERENCES Produk(id)
        ) ENGINE=InnoDB;
      `);
      console.log('✅ Tabel Stock sudah dibuat atau sudah ada.');

      // Buat tabel Pembelian
      await pool.query(`
        CREATE TABLE IF NOT EXISTS Pembelian (
          id INT AUTO_INCREMENT PRIMARY KEY,
          produk_id INT,
          kuantitas INT NOT NULL,
          status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (produk_id) REFERENCES Produk(id)
        ) ENGINE=InnoDB;
      `);
      console.log('✅ Tabel Pembelian sudah dibuat atau sudah ada.');

      return pool;
    } catch (err) {
      console.log(`❌ Gagal konek ke DB, coba lagi dalam 3 detik... (${i + 1}/${maxAttempts})`);
      console.error(err.message);
      await new Promise(res => setTimeout(res, 3000));
    }
  }

  throw new Error('🚫 Tidak bisa konek ke database setelah 10 kali percobaan.');
};

module.exports = ConnectDB;
