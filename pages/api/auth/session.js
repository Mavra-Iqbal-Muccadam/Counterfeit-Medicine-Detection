import { getSession } from '../../../backend/controllers/authController';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const session = await getSession();
      if (!session) {
        return res.status(401).json({ error: 'No active session' });
      }
      res.status(200).json({ session });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
