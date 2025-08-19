import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Quiz = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const { currentUser, updateUserData, API_BASE_URL } = useAuth();
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);

  const levelNames = {
    1: 'Traffic Signs',
    2: 'Vehicle Documents',
    3: 'Penalties & Fines',
    4: 'Safety Rules'
  };

  useEffect(() => {
    fetchQuestions();
  }, [level]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/questions/${level}`);
      setQuestions(response.data.questions);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch questions');
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!selectedAnswer) {
      alert('Please select an answer');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/submit_answer`, {
        question_id: questions[currentQuestionIndex].id,
        answer: selectedAnswer
      });

      setResult(response.data);
      setShowResult(true);

      if (response.data.is_correct) {
        setScore(score + response.data.points_earned);
      }

      // Update user data
      updateUserData({
        virtual_wallet: response.data.new_wallet_balance,
        total_score: response.data.new_total_score
      });

    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit answer');
    }
  };

  const nextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer('');
    setResult(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizComplete(true);
      checkLevelCompletion();
    }
  };

  const checkLevelCompletion = async () => {
    try {
      await axios.post(`${API_BASE_URL}/level_complete`, {
        level: parseInt(level)
      });
    } catch (error) {
      // Level not completed, but that's okay
      console.log('Level not completed yet');
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowResult(false);
    setResult(null);
    setQuizComplete(false);
    setScore(0);
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-red-500 text-xl mb-4">❌ {error}</div>
        <button onClick={() => navigate('/')} className="btn-primary">
          Go Home
        </button>
      </div>
    );
  }

  if (quizComplete) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="card">
          <h2 className="text-3xl font-bold mb-4">🎉 Quiz Complete!</h2>
          <p className="text-xl text-gray-600 mb-6">
            You've completed Level {level}: {levelNames[level]}
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-600">{score}</div>
                <div className="text-gray-600">Points Earned</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {Math.round((score / (questions.length * 10)) * 100)}%
                </div>
                <div className="text-gray-600">Accuracy</div>
              </div>
            </div>
          </div>

          <div className="space-x-4">
            <button onClick={restartQuiz} className="btn-secondary">
              Restart Quiz
            </button>
            <button onClick={() => navigate('/')} className="btn-primary">
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Level {level}: {levelNames[level]}
          </h1>
          <div className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-6">
          {currentQuestion.question_text}
        </h2>

        <div className="space-y-3 mb-6">
          {Object.entries(currentQuestion.options).map(([key, value]) => (
            <button
              key={key}
              onClick={() => !showResult && setSelectedAnswer(key)}
              className={`quiz-option ${
                selectedAnswer === key ? 'selected' : ''
              } ${
                showResult && result ? 
                  (key === selectedAnswer && result.is_correct ? 'correct' : 
                   key === selectedAnswer && !result.is_correct ? 'incorrect' : '') 
                : ''
              }`}
              disabled={showResult}
            >
              <span className="font-medium">{key}.</span> {value}
            </button>
          ))}
        </div>

        {showResult && result && (
          <div className={`p-4 rounded-lg mb-6 ${
            result.is_correct ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
          }`}>
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">
                {result.is_correct ? '✅' : '❌'}
              </span>
              <span className="font-semibold">
                {result.is_correct ? 'Correct!' : 'Incorrect!'}
              </span>
            </div>
            
            <p className="text-gray-700 mb-2">{result.explanation}</p>
            
            {!result.is_correct && result.penalty_message && (
              <div className="bg-red-200 p-3 rounded mt-3">
                <p className="text-red-800 font-medium">
                  💸 Penalty: {result.penalty_message}
                </p>
                <p className="text-red-700">
                  {result.penalty_points} points deducted from wallet
                </p>
              </div>
            )}
            
            {result.is_correct && (
              <div className="bg-green-200 p-3 rounded mt-3">
                <p className="text-green-800 font-medium">
                  🎉 +{result.points_earned} points earned!
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Exit Quiz
          </button>
          
          {!showResult ? (
            <button
              onClick={submitAnswer}
              className="btn-primary"
              disabled={!selectedAnswer}
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="btn-primary"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;