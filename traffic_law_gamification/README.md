# 🚦 Gamification of Indian Traffic Law - MCA Major Project

A comprehensive web application that gamifies learning Indian traffic laws through interactive quizzes, penalty systems, and achievement tracking.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Usage Guide](#usage-guide)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

## ✨ Features

### 🎮 Gamification Elements
- **4 Progressive Levels**: Traffic Signs → Vehicle Documents → Penalties & Fines → Safety Rules
- **Virtual Wallet System**: Start with ₹500, lose money for wrong answers
- **Real-time Scoring**: Instant feedback with explanations
- **Badges & Achievements**: Unlock rewards for completing levels
- **Leaderboard**: Compete with other users

### 📚 Educational Content
- **Comprehensive Questions**: 16+ questions covering all aspects of Indian traffic law
- **Instant Explanations**: Learn from mistakes with detailed explanations
- **Real Penalty Information**: Actual fine amounts and consequences
- **Progressive Difficulty**: Each level builds on previous knowledge

### 👤 User Management
- **Secure Authentication**: JWT-based login/signup system
- **Profile Tracking**: Monitor progress, scores, and achievements
- **Penalty History**: Track all violations and fines
- **Mobile-Friendly UI**: Responsive design with Tailwind CSS

## 🛠 Tech Stack

### Backend
- **Python Flask** - REST API framework
- **SQLAlchemy** - Database ORM
- **SQLite** - Database (PostgreSQL ready)
- **JWT** - Authentication tokens
- **Flask-CORS** - Cross-origin support

### Frontend
- **React 18** - Modern UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first styling
- **Context API** - State management

## 📁 Project Structure

```
traffic_law_gamification/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── seed_data.py        # Database seeding script
│   ├── requirements.txt    # Python dependencies
│   └── traffic_law_game.db # SQLite database (auto-generated)
├── frontend/
│   ├── public/
│   │   └── index.html      # HTML template
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Navbar.js
│   │   │   └── ProtectedRoute.js
│   │   ├── contexts/       # React contexts
│   │   │   └── AuthContext.js
│   │   ├── pages/          # Page components
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Quiz.js
│   │   │   ├── Leaderboard.js
│   │   │   ├── Penalties.js
│   │   │   └── Profile.js
│   │   ├── App.js          # Main App component
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Global styles
│   ├── package.json        # Node dependencies
│   ├── tailwind.config.js  # Tailwind configuration
│   └── postcss.config.js   # PostCSS configuration
└── README.md              # This file
```

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd traffic_law_gamification/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize database and seed data**
   ```bash
   python seed_data.py
   ```

5. **Run the Flask server**
   ```bash
   python app.py
   ```
   
   Backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd traffic_law_gamification/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   
   Frontend will be available at `http://localhost:3000`

### Quick Start (Both servers)

You can run both servers simultaneously:

**Terminal 1 (Backend):**
```bash
cd traffic_law_gamification/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python seed_data.py
python app.py
```

**Terminal 2 (Frontend):**
```bash
cd traffic_law_gamification/frontend
npm install
npm start
```

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `email` - User email
- `password_hash` - Encrypted password
- `total_score` - Accumulated points
- `virtual_wallet` - Current wallet balance
- `current_level` - Unlocked level (1-4)
- `badges` - JSON string of earned badges
- `created_at` - Registration timestamp

### Questions Table
- `id` - Primary key
- `level` - Quiz level (1-4)
- `question_text` - Question content
- `option_a/b/c/d` - Multiple choice options
- `correct_answer` - Correct option (A/B/C/D)
- `explanation` - Educational explanation
- `penalty_points` - Points deducted for wrong answer
- `penalty_message` - Fine description

### UserScore Table
- `id` - Primary key
- `user_id` - Foreign key to Users
- `question_id` - Foreign key to Questions
- `is_correct` - Boolean answer result
- `points_earned` - Points gained
- `answered_at` - Timestamp

### Penalties Table
- `id` - Primary key
- `user_id` - Foreign key to Users
- `question_id` - Foreign key to Questions
- `reason` - Violation description
- `points_deducted` - Fine amount
- `penalty_date` - Violation timestamp

## 🔌 API Documentation

### Authentication Endpoints

#### POST `/api/register`
Register a new user
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST `/api/login`
Login user
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

### Quiz Endpoints (Protected)

#### GET `/api/questions/<level>`
Get questions for specific level
- Headers: `Authorization: Bearer <token>`
- Returns: Array of questions with options

#### POST `/api/submit_answer`
Submit answer for a question
```json
{
  "question_id": 1,
  "answer": "B"
}
```

#### POST `/api/level_complete`
Mark level as completed
```json
{
  "level": 1
}
```

### User Data Endpoints (Protected)

#### GET `/api/profile`
Get current user profile

#### GET `/api/leaderboard`
Get top 10 users by score

#### GET `/api/penalties`
Get user's penalty history

## 📱 Usage Guide

### 1. Registration & Login
- Create account with username, email, and password
- Login to access quiz features
- Profile automatically tracks progress

### 2. Taking Quizzes
- Start with Level 1 (Traffic Signs)
- Answer multiple-choice questions
- Get instant feedback with explanations
- Earn points for correct answers
- Lose virtual money for wrong answers

### 3. Level Progression
- Complete 70% of questions correctly to unlock next level
- Each level focuses on different traffic law aspects:
  - **Level 1**: Traffic Signs 🚦
  - **Level 2**: Vehicle Documents 📄
  - **Level 3**: Penalties & Fines ⚖️
  - **Level 4**: Safety Rules 🛡️

### 4. Gamification Features
- **Virtual Wallet**: Starts at ₹500, deducted for penalties
- **Scoring System**: 10 points per correct answer
- **Badges**: Earn achievements for completing levels
- **Leaderboard**: Compete with other users
- **Penalty Tracking**: Monitor your violations

### 5. Monitoring Progress
- **Profile Page**: View stats, badges, and progress
- **Penalty History**: Track all violations and fines
- **Leaderboard**: See your ranking among all users

## 📸 Screenshots

### Home Page
- Level selection with progress indicators
- User stats dashboard
- Gamification elements

### Quiz Interface
- Clean question presentation
- Multiple choice options
- Instant feedback system
- Progress tracking

### Leaderboard
- Top 10 user rankings
- Score comparisons
- Achievement displays

### Profile Dashboard
- Personal statistics
- Badge collection
- Progress visualization

## 🎯 Key Learning Outcomes

### For Students
- **Real Traffic Law Knowledge**: Learn actual Indian traffic rules and penalties
- **Consequence Awareness**: Understand financial impact of violations
- **Interactive Learning**: Engage with content through gamification
- **Progress Tracking**: Monitor improvement over time

### For Developers
- **Full-Stack Development**: Flask backend + React frontend
- **Database Design**: Relational database with proper normalization
- **Authentication**: JWT-based secure user management
- **API Development**: RESTful API design principles
- **UI/UX Design**: Modern, responsive interface design

## 🔧 Technical Features

### Security
- Password hashing with Werkzeug
- JWT token authentication
- CORS protection
- Input validation and sanitization

### Performance
- Efficient database queries with SQLAlchemy
- React component optimization
- Responsive design for mobile devices
- Fast loading with modern build tools

### Scalability
- Modular code architecture
- Database design supports PostgreSQL migration
- Component-based frontend architecture
- RESTful API design

## 🚀 Future Enhancements

### Phase 2 Features
- **Pre/Post Assessment Survey**: Measure learning effectiveness
- **CSV Export**: Export results for research purposes
- **Advanced Analytics**: Detailed performance metrics
- **Social Features**: Friend challenges and group competitions

### Technical Improvements
- **Database Migration**: Move to PostgreSQL for production
- **Caching**: Implement Redis for better performance
- **Testing**: Add comprehensive test suites
- **Deployment**: Docker containerization and CI/CD pipeline

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes as an MCA major project.

## 👥 Team

**MCA Major Project**
- **Student**: [Your Name]
- **Institution**: [Your College/University]
- **Guide**: [Guide Name]
- **Year**: [Academic Year]

## 📞 Support

For any queries or issues:
- Email: [your-email@example.com]
- GitHub Issues: [Repository Issues Page]

---

**Made with ❤️ for road safety education in India** 🇮🇳