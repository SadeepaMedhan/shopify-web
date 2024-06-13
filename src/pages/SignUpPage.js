// src/pages/SignUpPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Add registration logic here (e.g., using Axios to send registration data to backend)
    console.log('Sign Up:', { email, password, confirmPassword });
    // Reset form fields after submission
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="container mx-auto py-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSignUp}>
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
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
            Sign Up
          </button>
        </form>
        <p className="text-sm mt-3 text-center">
          Already have an account? <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
