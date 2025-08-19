from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import jwt
import os
from functools import wraps

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///traffic_law_game.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    total_score = db.Column(db.Integer, default=0)
    virtual_wallet = db.Column(db.Integer, default=500)
    current_level = db.Column(db.Integer, default=1)
    badges = db.Column(db.Text, default='')  # JSON string of earned badges
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    level = db.Column(db.Integer, nullable=False)
    question_text = db.Column(db.Text, nullable=False)
    option_a = db.Column(db.String(200), nullable=False)
    option_b = db.Column(db.String(200), nullable=False)
    option_c = db.Column(db.String(200), nullable=False)
    option_d = db.Column(db.String(200), nullable=False)
    correct_answer = db.Column(db.String(1), nullable=False)  # A, B, C, or D
    explanation = db.Column(db.Text, nullable=False)
    penalty_points = db.Column(db.Integer, default=50)
    penalty_message = db.Column(db.String(200), default='')

class UserScore(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), nullable=False)
    is_correct = db.Column(db.Boolean, nullable=False)
    points_earned = db.Column(db.Integer, default=0)
    answered_at = db.Column(db.DateTime, default=datetime.utcnow)

class Penalty(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), nullable=False)
    reason = db.Column(db.String(200), nullable=False)
    points_deducted = db.Column(db.Integer, nullable=False)
    penalty_date = db.Column(db.DateTime, default=datetime.utcnow)

class Badge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    icon = db.Column(db.String(50), default='🏆')
    level_required = db.Column(db.Integer, nullable=False)

# JWT Token decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            if token.startswith('Bearer '):
                token = token[7:]
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.filter_by(id=data['user_id']).first()
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        
        return f(current_user, *args, **kwargs)
    return decorated

# Authentication Routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': 'Username already exists!'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already exists!'}), 400
    
    user = User(
        username=data['username'],
        email=data['email']
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully!'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    
    if user and user.check_password(data['password']):
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(days=30)
        }, app.config['SECRET_KEY'], algorithm='HS256')
        
        return jsonify({
            'token': token,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'total_score': user.total_score,
                'virtual_wallet': user.virtual_wallet,
                'current_level': user.current_level
            }
        })
    
    return jsonify({'message': 'Invalid credentials!'}), 401

# Quiz Routes
@app.route('/api/questions/<int:level>', methods=['GET'])
@token_required
def get_questions(current_user, level):
    if level > current_user.current_level:
        return jsonify({'message': 'Level not unlocked yet!'}), 403
    
    questions = Question.query.filter_by(level=level).all()
    questions_data = []
    
    for q in questions:
        questions_data.append({
            'id': q.id,
            'question_text': q.question_text,
            'options': {
                'A': q.option_a,
                'B': q.option_b,
                'C': q.option_c,
                'D': q.option_d
            }
        })
    
    return jsonify({'questions': questions_data})

@app.route('/api/submit_answer', methods=['POST'])
@token_required
def submit_answer(current_user):
    data = request.get_json()
    question = Question.query.get(data['question_id'])
    
    if not question:
        return jsonify({'message': 'Question not found!'}), 404
    
    is_correct = data['answer'] == question.correct_answer
    points_earned = 10 if is_correct else 0
    
    # Record the score
    score = UserScore(
        user_id=current_user.id,
        question_id=question.id,
        is_correct=is_correct,
        points_earned=points_earned
    )
    db.session.add(score)
    
    if is_correct:
        current_user.total_score += points_earned
    else:
        # Deduct penalty points from virtual wallet
        current_user.virtual_wallet -= question.penalty_points
        
        # Record penalty
        penalty = Penalty(
            user_id=current_user.id,
            question_id=question.id,
            reason=question.penalty_message,
            points_deducted=question.penalty_points
        )
        db.session.add(penalty)
    
    db.session.commit()
    
    return jsonify({
        'is_correct': is_correct,
        'explanation': question.explanation,
        'penalty_message': question.penalty_message if not is_correct else '',
        'points_earned': points_earned,
        'penalty_points': question.penalty_points if not is_correct else 0,
        'new_wallet_balance': current_user.virtual_wallet,
        'new_total_score': current_user.total_score
    })

@app.route('/api/level_complete', methods=['POST'])
@token_required
def complete_level(current_user):
    data = request.get_json()
    level = data['level']
    
    # Check if user has answered enough questions correctly in this level
    correct_answers = UserScore.query.join(Question).filter(
        UserScore.user_id == current_user.id,
        Question.level == level,
        UserScore.is_correct == True
    ).count()
    
    total_questions = Question.query.filter_by(level=level).count()
    
    if correct_answers >= (total_questions * 0.7):  # 70% pass rate
        if current_user.current_level == level:
            current_user.current_level += 1
            db.session.commit()
            
            return jsonify({
                'message': 'Level completed! Next level unlocked!',
                'new_level': current_user.current_level
            })
    
    return jsonify({'message': 'Need more correct answers to complete level'}), 400

# Leaderboard Route
@app.route('/api/leaderboard', methods=['GET'])
@token_required
def get_leaderboard(current_user):
    top_users = User.query.order_by(User.total_score.desc()).limit(10).all()
    leaderboard = []
    
    for i, user in enumerate(top_users):
        leaderboard.append({
            'rank': i + 1,
            'username': user.username,
            'total_score': user.total_score,
            'level': user.current_level
        })
    
    return jsonify({'leaderboard': leaderboard})

# Penalty History Route
@app.route('/api/penalties', methods=['GET'])
@token_required
def get_penalties(current_user):
    penalties = Penalty.query.filter_by(user_id=current_user.id).order_by(
        Penalty.penalty_date.desc()
    ).all()
    
    penalty_list = []
    for p in penalties:
        penalty_list.append({
            'reason': p.reason,
            'points_deducted': p.points_deducted,
            'date': p.penalty_date.strftime('%Y-%m-%d %H:%M:%S')
        })
    
    return jsonify({'penalties': penalty_list})

# User Profile Route
@app.route('/api/profile', methods=['GET'])
@token_required
def get_profile(current_user):
    return jsonify({
        'id': current_user.id,
        'username': current_user.username,
        'email': current_user.email,
        'total_score': current_user.total_score,
        'virtual_wallet': current_user.virtual_wallet,
        'current_level': current_user.current_level
    })

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)