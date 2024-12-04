import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const userLogin = async () => {
    try {
      const res = await axios.post('https://todoserver-megu.onrender.com/api/login', { username, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      navigate('/notes');
      console.log('Logged in successfully');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200">
  <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8 transform transition-transform hover:scale-105">
    <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-100">
      Login
    </h2>
    <p className="text-center text-sm mb-4 text-gray-400 animate-fadeIn">
      Welcome back! Please log in to manage your tasks efficiently.
    </p>
    <div className="space-y-6">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-300"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full mt-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-100"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-300"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mt-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-100"
        />
      </div>
      <button
        onClick={userLogin}
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition-transform duration-300 hover:scale-105"
      >
        Login
      </button>
      <p className="text-center text-sm text-gray-400">
        New user?{' '}
        <Link to="/register" className="text-purple-400 hover:underline">
          Register here
        </Link>
      </p>
      <p className="text-center text-xs text-gray-500 mt-4">
        Note: The server is running on a free tier and might take 10-15 seconds for the initial response.
      </p>
    </div>
  </div>
  </div>

  );
}

export default Login;
