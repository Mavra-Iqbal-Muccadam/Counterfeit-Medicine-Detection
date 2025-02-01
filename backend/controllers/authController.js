// import { supabase } from '../utils/supabase';

// // Sign up a new user
// export const signUp = async (email, password) => {
//   const { data, error } = await supabase.auth.signUp({ email, password });
//   if (error) throw error;
//   return data;
// };

// // Log in an existing user
// export const logIn = async (email, password) => {
//   const { data, error } = await supabase.auth.signInWithPassword({ email, password });
//   if (error) throw error;
//   return data;
// };

// // Log out a user
// export const logOut = async () => {
//   const { error } = await supabase.auth.signOut();
//   if (error) throw error;
//   return { message: 'Logged out successfully' };
// };

// // Check current session
// export const getSession = async () => {
//   const { data: session, error } = await supabase.auth.getSession();
//   if (error) throw error;
//   return session;
// };
