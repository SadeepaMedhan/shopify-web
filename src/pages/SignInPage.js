// src/pages/SignInPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    // Add authentication logic here (e.g., using Axios to send credentials to backend)
    console.log('Sign In:', { email, password });
    // Reset form fields after submission
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container mx-auto py-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
            Sign In
          </button>
        </form>
        <p className="text-sm mt-3 text-center">
          Don't have an account? <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
