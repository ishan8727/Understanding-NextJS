import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Navbar from '../components/Navbar';

const signup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setError('Successfully created account! Redirecting to login...');
        setTimeout(() => router.push('/Login'), 1500);
      } else {
        setError(data.message || 'Signup failed!');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Network error. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={false} />
      
      <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-gradient-to-tl from-green-200 to-blue-200 px-4">
        <div className="rounded-xl overflow-hidden shadow-xl w-[400px] bg-white relative border border-gray-200">
          
          {/* Header Blob */}
          <div className=" relative bg-gradient-to-br from-green-400 via-teal-400 to-yellow-300 h-36 w-full rounded-b-[60px]">
          <p className="absolute top-4 left-[140] font-extrabold text-white text-3xl">SIGNUP</p>
          <div className="absolute bottom-4 left-8 text-white font-bold text-xl">
              Create<br />Account
            </div>
          </div>

          {/* Form */}
          <div className="p-8 space-y-5">
            <div>
              <label className="block text-gray-600 font-medium text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Your name"
                className="w-full border-b border-gray-500 focus:outline-none focus:border-green-500 text-gray-800 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border-b border-gray-500 focus:outline-none focus:border-green-500 text-gray-800 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border-b border-gray-500 focus:outline-none focus:border-green-500 text-gray-800 py-2"
              />
            </div>

            {error && <p className={`text-sm ${error.includes('Successfully') ? 'text-green-500' : 'text-red-500'}`}>{error}</p>}

            <button
              onClick={handleSignup}
              className="bg-green-500 hover:bg-green-600 text-white py-2 w-full rounded-full text-lg font-semibold transition duration-300"
            >
              Sign Up
            </button>
            <div className="flex items-center border-b border-gray-400"></div>
            <button
              onClick={() => router.push('/Login')}
              className="bg-purple-500 mb-5  hover:bg-purple-600 text-white font-bold text-lg py-2 w-full h-[50] rounded-full transition duration-300"
            >
              Sign-In Instead?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signup;