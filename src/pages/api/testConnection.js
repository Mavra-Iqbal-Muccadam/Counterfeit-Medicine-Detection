// import { supabase } from '../../backend/utils/supabase';

// export default async function handler(req, res) {
//   try {
//     // Perform a simple query or test with Supabase
//     const { data, error } = await supabase.from('users').select('*');

//     if (error) throw error;

//     res.status(200).json({ message: 'Database connection successful', data });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }
