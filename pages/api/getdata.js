import pool from '../../lib/db';

export default async function handler(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM manufacturers');
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
