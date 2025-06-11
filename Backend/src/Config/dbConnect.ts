import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function checkPoolConnection() {
  try {
    const connection = await pool.getConnection();
    await connection.query('SELECT 1'); // simple test query
    console.log('✅ MySQL pool is connected');
    connection.release();
  } catch (error) {
    console.error('❌ MySQL pool connection failed:', (error as {message: string}).message);
  }
}

checkPoolConnection();