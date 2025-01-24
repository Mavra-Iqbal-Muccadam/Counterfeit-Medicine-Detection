'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../backend/utils/supabase/client'; // Update with the correct path to your Supabase client

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Attempt to log in using Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(`Error: ${error.message}`);
        console.error('Login error:', error.message);
      } else {
        console.log('Login successful:', data);
        setMessage('Login successful!');
        router.push('/dashboard'); // Redirect to a dashboard or homepage after login
      }
    } catch (err) {
      setMessage('Something went wrong. Please try again.');
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Log In</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium" htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium" htmlFor="password">
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Your password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/signup')}
            className="w-full px-4 py-2 mt-4 text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-100 focus:outline-none"
          >
            Sign up
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
}
