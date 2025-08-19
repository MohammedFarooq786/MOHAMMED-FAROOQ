import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🚦</span>
            <span className="text-xl font-bold text-gray-800">Traffic Law Quiz</span>
          </Link>

          <div className="flex items-center space-x-6">
            {currentUser ? (
              <>
                <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Home
                </Link>
                <Link to="/leaderboard" className="text-gray-600 hover:text-primary-600 transition-colors">
                  🏆 Leaderboard
                </Link>
                <Link to="/penalties" className="text-gray-600 hover:text-primary-600 transition-colors">
                  📋 My Penalties
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-primary-600 transition-colors">
                  👤 Profile
                </Link>
                
                <div className="flex items-center space-x-4 border-l pl-4">
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">{currentUser.username}</div>
                    <div className="text-gray-500">💰 {currentUser.virtual_wallet} pts</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;