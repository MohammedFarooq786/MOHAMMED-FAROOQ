import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  const levels = [
    {
      id: 1,
      title: 'Traffic Signs',
      description: 'Learn about different traffic signs and their meanings',
      icon: '🚦',
      color: 'bg-red-500'
    },
    {
      id: 2,
      title: 'Vehicle Documents',
      description: 'Understand required documents for driving',
      icon: '📄',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Penalties & Fines',
      description: 'Know the penalties for traffic violations',
      icon: '⚖️',
      color: 'bg-yellow-500'
    },
    {
      id: 4,
      title: 'Safety Rules',
      description: 'Master road safety rules and best practices',
      icon: '🛡️',
      color: 'bg-green-500'
    }
  ];

  if (!currentUser) {
    return (
      <div className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            🚦 Welcome to Traffic Law Gamification
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Learn Indian traffic laws through interactive quizzes and games
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card text-left">
              <h3 className="text-2xl font-semibold mb-4">🎮 Gamified Learning</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Interactive quizzes with instant feedback</li>
                <li>• Level-based progression system</li>
                <li>• Virtual wallet with penalty system</li>
                <li>• Badges and achievements</li>
              </ul>
            </div>
            
            <div className="card text-left">
              <h3 className="text-2xl font-semibold mb-4">📚 Comprehensive Content</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Traffic signs and signals</li>
                <li>• Vehicle documentation requirements</li>
                <li>• Penalty amounts and consequences</li>
                <li>• Road safety best practices</li>
              </ul>
            </div>
          </div>

          <div className="space-x-4">
            <Link to="/register" className="btn-primary text-lg px-8 py-3">
              Get Started
            </Link>
            <Link to="/login" className="btn-secondary text-lg px-8 py-3">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome back, {currentUser.username}! 👋
        </h1>
        <div className="flex justify-center space-x-8 text-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{currentUser.total_score}</div>
            <div className="text-gray-600">Total Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">₹{currentUser.virtual_wallet}</div>
            <div className="text-gray-600">Virtual Wallet</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{currentUser.current_level}</div>
            <div className="text-gray-600">Current Level</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {levels.map((level) => {
          const isUnlocked = level.id <= currentUser.current_level;
          const isCompleted = level.id < currentUser.current_level;
          
          return (
            <div key={level.id} className={`card relative ${!isUnlocked ? 'opacity-50' : ''}`}>
              {isCompleted && (
                <div className="absolute top-4 right-4 text-green-500 text-2xl">
                  ✅
                </div>
              )}
              
              <div className={`w-16 h-16 ${level.color} rounded-full flex items-center justify-center text-2xl mb-4 mx-auto`}>
                {level.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-center mb-2">
                Level {level.id}: {level.title}
              </h3>
              
              <p className="text-gray-600 text-center mb-4">
                {level.description}
              </p>
              
              {isUnlocked ? (
                <Link
                  to={`/quiz/${level.id}`}
                  className="btn-primary w-full text-center"
                >
                  {isCompleted ? 'Replay' : 'Start Quiz'}
                </Link>
              ) : (
                <button className="btn-secondary w-full cursor-not-allowed" disabled>
                  🔒 Locked
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
        <div className="flex justify-center space-x-4">
          <Link to="/leaderboard" className="btn-primary">
            🏆 View Leaderboard
          </Link>
          <Link to="/penalties" className="btn-secondary">
            📋 My Penalty History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;