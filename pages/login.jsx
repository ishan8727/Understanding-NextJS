import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-300 to-blue-100 px-4">
      <div className="rounded-2xl overflow-hidden shadow-2xl w-[380px] bg-white relative">
        
        {/* Blob */}
        <div className="relative bg-gradient-to-tr from-pink-300 via-purple-400 to-yellow-300 h-40 w-full rounded-b-[70px]">
          <button className="absolute top-4 left-4 text-white text-xl">&larr;</button>
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
              placeholder="example@blabla.com"
              className="w-full border-b border-gray-700 font-normal focus:outline-none focus:border-purple-500 text-gray-800 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-500 font-medium text-sm">Password</label>
            <div className="flex items-center border-b border-gray-400">
              <input
                type="password"
                placeholder="••••••••"
                className="w-full focus:outline-none py-2 text-gray-800"
              />
              <div className="text-purple-500">
                
              </div>
            </div>
          </div>

          <div className="flex justify-between text-sm text-purple-600 font-medium">
            <a href="#" className="hover:underline">Sign up</a>
            <a href="#" className="hover:underline">Forgot Password?</a>
          </div>

          <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 w-full rounded-full transition duration-300">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
