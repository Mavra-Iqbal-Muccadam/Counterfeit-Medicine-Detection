// import { signUp } from '../../../backend/controllers/authController';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { email, password } = req.body;

//     try {
//       const data = await signUp(email, password);
//       res.status(200).json({ message: 'User signed up successfully!', data });
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).json({ error: `Method ${req.method} not allowed` });
//   }
// }
