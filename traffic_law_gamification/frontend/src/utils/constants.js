// Application constants and configuration

export const LEVELS = {
  1: {
    name: 'Traffic Signs',
    icon: '🚦',
    color: 'bg-red-500',
    description: 'Learn about different traffic signs and their meanings'
  },
  2: {
    name: 'Vehicle Documents',
    icon: '📄',
    color: 'bg-blue-500',
    description: 'Understand required documents for driving'
  },
  3: {
    name: 'Penalties & Fines',
    icon: '⚖️',
    color: 'bg-yellow-500',
    description: 'Know the penalties for traffic violations'
  },
  4: {
    name: 'Safety Rules',
    icon: '🛡️',
    color: 'bg-green-500',
    description: 'Master road safety rules and best practices'
  }
};

export const BADGES = {
  1: { icon: '🚦', name: 'Sign Master', desc: 'Completed Traffic Signs' },
  2: { icon: '📄', name: 'Document Expert', desc: 'Completed Vehicle Documents' },
  3: { icon: '⚖️', name: 'Law Enforcer', desc: 'Completed Penalties & Fines' },
  4: { icon: '🛡️', name: 'Safety Champion', desc: 'Completed Safety Rules' }
};

export const INITIAL_WALLET_AMOUNT = 500;

export const POINTS_PER_CORRECT_ANSWER = 10;

export const PASS_PERCENTAGE = 70;

export const API_ENDPOINTS = {
  REGISTER: '/register',
  LOGIN: '/login',
  PROFILE: '/profile',
  QUESTIONS: '/questions',
  SUBMIT_ANSWER: '/submit_answer',
  LEVEL_COMPLETE: '/level_complete',
  LEADERBOARD: '/leaderboard',
  PENALTIES: '/penalties'
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  QUIZ: '/quiz',
  LEADERBOARD: '/leaderboard',
  PENALTIES: '/penalties',
  PROFILE: '/profile'
};