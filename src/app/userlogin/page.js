'use client';

import { useState } from 'react';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const userData = { 
      email: formData.email, 
      password: formData.password, 
      username: formData.username, 
      role: 'user' // Default role
    };

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    alert(data.message || 'Signup successful');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.email, password: formData.password }),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      alert('Login successful');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-4">
          <button onClick={() => setActiveTab('login')} 
            className={`px-4 py-2 ${activeTab === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
            Login
          </button>
          <button onClick={() => setActiveTab('signup')} 
            className={`px-4 py-2 ${activeTab === 'signup' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
            Sign Up
          </button>
        </div>
        {activeTab === 'login' ? (
          <form onSubmit={handleLogin} className="flex flex-col">
            <input name="email" type="email" placeholder="Email" required onChange={handleChange}
              className="mb-2 p-2 border rounded"/>
            <input name="password" type="password" placeholder="Password" required onChange={handleChange}
              className="mb-2 p-2 border rounded"/>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="flex flex-col">
            <input name="username" type="text" placeholder="User name" required onChange={handleChange}
              className="mb-2 p-2 border rounded"/>
            <input name="email" type="email" placeholder="Email" required onChange={handleChange}
              className="mb-2 p-2 border rounded"/>
            <input name="password" type="password" placeholder="Password" required onChange={handleChange}
              className="mb-2 p-2 border rounded"/>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
}
