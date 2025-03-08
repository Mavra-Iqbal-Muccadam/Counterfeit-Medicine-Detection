import { supabase } from '../../../lib/supabaseClientanon';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { email, password, username } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into Supabase database
    const { data, error } = await supabase
    .from('users')
    .insert([{ email, password: hashedPassword, role: 'user', created_at: new Date().toISOString() }]);

    if (error) return res.status(500).json({ message: 'Error creating user', error: error.message });

    res.status(201).json({ message: 'User created successfully', user: data });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}
