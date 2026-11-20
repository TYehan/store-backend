const mysql = require('mysql2/promise');
const fs = require('fs');

(async () => {
    const conn = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        multiplesStatements: true
    });

    await conn.query(fs.readFileSync('store_db_reset.sql', 'utf8'));
    const [rows] = await conn.query('SELECT * FROM store_db.products');
    console.table(rows); // Displays database rows in a clean table format
    process.exit(0);
    })();