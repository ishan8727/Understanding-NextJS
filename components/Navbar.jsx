import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Navbar = ({ isLoggedIn = false, userEmail = null }) => {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      // Clear the auth cookie by setting it to expire
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      router.push('/Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getUserInitial = (email) => {
    return email ? email.charAt(0).toUpperCase() : 'U';
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                AuthApp
              </h1>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              // Not logged in - show login/signup buttons
              <div className="flex space-x-2">
                <button
                  onClick={() => router.push('/Login')}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push('/Signup')}
                  className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600 font-medium transition duration-200"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              // Logged in - show user menu
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {getUserInitial(userEmail)}
                  </div>
                  <span className="text-gray-700 font-medium hidden sm:block">
                    {userEmail}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        router.push('/Dashboard');
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        // Add profile functionality here
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        // Add settings functionality here
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                    >
                      Settings
                    </button>
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
