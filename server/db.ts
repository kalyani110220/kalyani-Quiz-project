// db.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT ?? '5432')
});

export async function queryDatabase(queryText: string) {
  console.log('SQL query: ', queryText);
  try {
    const client = await pool.connect();
    const result = await client.query(queryText);
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}