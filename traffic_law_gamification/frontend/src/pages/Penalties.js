import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Penalties = () => {
  const [penalties, setPenalties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { API_BASE_URL, currentUser } = useAuth();

  useEffect(() => {
    fetchPenalties();
  }, []);

  const fetchPenalties = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/penalties`);
      setPenalties(response.data.penalties);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch penalties');
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTotalPenalties = () => {
    return penalties.reduce((total, penalty) => total + penalty.points_deducted, 0);
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading penalty history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-red-500 text-xl mb-4">❌ {error}</div>
        <button onClick={fetchPenalties} className="btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          📋 My Penalty History
        </h1>
        <p className="text-gray-600">
          Track your traffic law violations and fines
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-gradient-to-r from-red-50 to-red-100">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">
              {penalties.length}
            </div>
            <div className="text-gray-700 font-medium">Total Violations</div>
          </div>
        </div>
        
        <div className="card bg-gradient-to-r from-orange-50 to-orange-100">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              ₹{getTotalPenalties().toLocaleString()}
            </div>
            <div className="text-gray-700 font-medium">Total Penalties</div>
          </div>
        </div>
        
        <div className="card bg-gradient-to-r from-green-50 to-green-100">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              ₹{currentUser?.virtual_wallet || 0}
            </div>
            <div className="text-gray-700 font-medium">Current Wallet</div>
          </div>
        </div>
      </div>

      {penalties.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            No Penalties Yet!
          </h3>
          <p className="text-gray-600 text-lg">
            You're doing great! Keep answering correctly to maintain a clean record.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Penalty Records ({penalties.length})
          </h2>
          
          {penalties.map((penalty, index) => (
            <div key={index} className="card border-l-4 border-red-500">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">🚨</span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Traffic Violation
                    </h3>
                  </div>
                  
                  <p className="text-gray-700 mb-2">
                    <strong>Reason:</strong> {penalty.reason}
                  </p>
                  
                  <p className="text-sm text-gray-600">
                    <strong>Date:</strong> {formatDate(penalty.date)}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">
                    -₹{penalty.points_deducted}
                  </div>
                  <div className="text-sm text-gray-600">
                    Fine Amount
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Educational Section */}
      <div className="mt-12">
        <div className="card bg-gradient-to-r from-blue-50 to-indigo-50">
          <h3 className="text-xl font-semibold mb-4 text-center">
            💡 Learn from Your Mistakes
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">🎯 Tips to Avoid Penalties:</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Read questions carefully before answering</li>
                <li>• Take your time to understand traffic rules</li>
                <li>• Review explanations after each question</li>
                <li>• Practice regularly to improve knowledge</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">🏆 Benefits of Clean Record:</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Higher ranking on leaderboard</li>
                <li>• More points in virtual wallet</li>
                <li>• Better understanding of traffic laws</li>
                <li>• Safer driving in real life</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <button 
              onClick={() => window.location.href = '/'}
              className="btn-primary"
            >
              Continue Learning 📚
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Penalties;