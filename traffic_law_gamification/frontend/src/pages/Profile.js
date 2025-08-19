import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();

  const getLevelName = (level) => {
    const levels = {
      1: 'Traffic Signs',
      2: 'Vehicle Documents', 
      3: 'Penalties & Fines',
      4: 'Safety Rules'
    };
    return levels[level] || 'Unknown Level';
  };

  const getProgressPercentage = () => {
    return Math.min((currentUser.current_level / 4) * 100, 100);
  };

  const getBadges = () => {
    const badges = [];
    const levelBadges = {
      1: { icon: '🚦', name: 'Sign Master', desc: 'Completed Traffic Signs' },
      2: { icon: '📄', name: 'Document Expert', desc: 'Completed Vehicle Documents' },
      3: { icon: '⚖️', name: 'Law Enforcer', desc: 'Completed Penalties & Fines' },
      4: { icon: '🛡️', name: 'Safety Champion', desc: 'Completed Safety Rules' }
    };

    for (let i = 1; i < currentUser.current_level; i++) {
      if (levelBadges[i]) {
        badges.push(levelBadges[i]);
      }
    }
    return badges;
  };

  const getAccountAge = () => {
    if (!currentUser.created_at) return 'Recently joined';
    
    const created = new Date(currentUser.created_at);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const badges = getBadges();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          👤 My Profile
        </h1>
        <p className="text-gray-600">
          Your Traffic Law Quiz journey
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-600">Username</span>
                <span className="font-medium">{currentUser.username}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-600">Email</span>
                <span className="font-medium">{currentUser.email}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium">{getAccountAge()}</span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Current Level</span>
                <span className="font-medium">
                  Level {currentUser.current_level}: {getLevelName(currentUser.current_level)}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">Learning Progress</h2>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Overall Progress</span>
                <span className="font-medium">{Math.round(getProgressPercentage())}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">
                  {currentUser.total_score.toLocaleString()}
                </div>
                <div className="text-gray-600">Total Score</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  ₹{currentUser.virtual_wallet.toLocaleString()}
                </div>
                <div className="text-gray-600">Virtual Wallet</div>
              </div>
            </div>
          </div>

          {/* Badges Section */}
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">🏆 Achievements</h2>
            
            {badges.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🎯</div>
                <p className="text-gray-600">
                  Complete quiz levels to earn badges!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {badges.map((badge, index) => (
                  <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                    <div className="text-center">
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <div className="font-semibold text-gray-800">{badge.name}</div>
                      <div className="text-sm text-gray-600">{badge.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {badges.length < 4 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  🎮 Complete more levels to unlock {4 - badges.length} more badges!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">📊 Quick Stats</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Levels Completed</span>
                <span className="font-medium">{currentUser.current_level - 1}/4</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Badges Earned</span>
                <span className="font-medium">{badges.length}/4</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Points per Level</span>
                <span className="font-medium">
                  {currentUser.current_level > 1 
                    ? Math.round(currentUser.total_score / (currentUser.current_level - 1))
                    : 0
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="text-lg font-semibold mb-4">🎯 Next Goal</h3>
            
            {currentUser.current_level <= 4 ? (
              <div>
                <p className="text-sm text-gray-700 mb-3">
                  Complete Level {currentUser.current_level}:
                </p>
                <p className="font-medium text-primary-700">
                  {getLevelName(currentUser.current_level)}
                </p>
                <button 
                  onClick={() => window.location.href = `/quiz/${currentUser.current_level}`}
                  className="btn-primary w-full mt-4 text-sm"
                >
                  Start Quiz 🚀
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-3xl mb-2">🎉</div>
                <p className="text-sm text-gray-700">
                  Congratulations! You've completed all levels!
                </p>
              </div>
            )}
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">🔗 Quick Actions</h3>
            
            <div className="space-y-2">
              <button 
                onClick={() => window.location.href = '/leaderboard'}
                className="btn-secondary w-full text-sm"
              >
                🏆 View Leaderboard
              </button>
              
              <button 
                onClick={() => window.location.href = '/penalties'}
                className="btn-secondary w-full text-sm"
              >
                📋 Penalty History
              </button>
              
              <button 
                onClick={() => window.location.href = '/'}
                className="btn-primary w-full text-sm"
              >
                🏠 Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;