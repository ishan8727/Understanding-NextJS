import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

const Login = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const router = useRouter();

const handleLogin = async () => {
  if (!email.trim() || !password.trim()) {
    setError('Please fill in all fields');
    return;
  }

  try {
    console.log('Starting login request...');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    console.log('Response status:', res.status);
    const data = await res.json();
    console.log('Response data:', data);

    if (res.ok) {
      setError('Login successful! Redirecting...');
      console.log('Login successful, redirecting to dashboard...');
      
      // Force page reload and redirect
      window.location.href = '/Dashboard';
    } else {
      setError(data.message || "Login Failed!");
    }
  } catch (error) {
    console.error('Login error:', error);
    setError('Network error. Please try again.');
  }
}

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={false} />
      
      <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-gradient-to-br from-purple-300 to-blue-100 px-4">
        <div className="rounded-2xl overflow-hidden shadow-2xl w-[380px] bg-white relative">
          
          {/* Blob */}
          <div className="relative bg-gradient-to-tr from-pink-300 via-purple-400 to-yellow-300 h-40 w-full rounded-b-[70px]">
            <p className="absolute top-4 left-[140] font-extrabold text-white text-3xl">LOGIN</p>
            <div className="absolute bottom-4 left-10 text-white font-semibold text-2xl">
              Welcome<br />Back
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-gray-500 font-medium text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="example@blabla.com"
                className="w-full border-b border-gray-700 font-normal focus:outline-none focus:border-purple-500 text-gray-800 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-500 font-medium text-sm">Password</label>
              <div className="flex items-center border-b border-gray-400">
                <input
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full focus:outline-none py-2 text-gray-800"
                />
              </div>
            </div>

            {error && <p className={`text-sm ${error.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{error}</p>}

            <button
              onClick={handleLogin}
              className="bg-purple-500 mb-5 mt-6 hover:bg-purple-600 text-white font-bold text-lg py-2 w-full h-[50] rounded-full transition duration-300">
              Sign In
            </button>
            <div className="flex items-center border-b border-gray-400"></div>
            <button
              onClick={()=>router.push('/Signup')}
              className="bg-green-500 hover:bg-green-600 text-white py-2 w-full rounded-full text-lg font-semibold transition duration-300"
            >
              SignUp instead?
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
