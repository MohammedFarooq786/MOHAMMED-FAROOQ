import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { API_BASE_URL, currentUser } = useAuth();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/leaderboard`);
      setLeaderboard(response.data.leaderboard);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch leaderboard');
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3: return 'bg-gradient-to-r from-orange-400 to-orange-600';
      default: return 'bg-gradient-to-r from-blue-400 to-blue-600';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-red-500 text-xl mb-4">❌ {error}</div>
        <button onClick={fetchLeaderboard} className="btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          🏆 Leaderboard
        </h1>
        <p className="text-gray-600">
          Top performers in Traffic Law Quiz
        </p>
      </div>

      {leaderboard.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">No players on the leaderboard yet.</p>
          <p className="text-gray-500 mt-2">Be the first to complete some quizzes!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {leaderboard.map((user, index) => {
            const isCurrentUser = user.username === currentUser?.username;
            
            return (
              <div
                key={user.username}
                className={`card transition-all duration-200 ${
                  isCurrentUser 
                    ? 'ring-2 ring-primary-500 bg-primary-50' 
                    : 'hover:shadow-lg'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full ${getRankColor(user.rank)} flex items-center justify-center text-white font-bold text-lg`}>
                      {user.rank}
                    </div>
                    
                    <div className="text-3xl">
                      {getRankIcon(user.rank)}
                    </div>
                    
                    <div>
                      <h3 className={`text-xl font-semibold ${
                        isCurrentUser ? 'text-primary-700' : 'text-gray-900'
                      }`}>
                        {user.username}
                        {isCurrentUser && (
                          <span className="ml-2 text-sm bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                            You
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600">
                        Level {user.level}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">
                      {user.total_score.toLocaleString()}
                    </div>
                    <div className="text-gray-600">
                      points
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-12 text-center">
        <div className="card bg-gradient-to-r from-primary-50 to-blue-50">
          <h3 className="text-xl font-semibold mb-4">🎯 How to Climb the Leaderboard</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-2xl mb-2">📚</div>
              <p>Complete more quiz levels to earn points</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🎯</div>
              <p>Answer correctly to avoid penalty deductions</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🔄</div>
              <p>Replay levels to improve your score</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;