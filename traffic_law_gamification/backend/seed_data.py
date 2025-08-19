from app import app, db, Question, Badge
from datetime import datetime

def seed_database():
    with app.app_context():
        # Clear existing data
        Question.query.delete()
        Badge.query.delete()
        
        # Level 1: Traffic Signs
        level1_questions = [
            {
                'level': 1,
                'question_text': 'What does a red traffic light signal mean?',
                'option_a': 'Slow down and proceed with caution',
                'option_b': 'Stop completely',
                'option_c': 'Yield to oncoming traffic',
                'option_d': 'Speed up to clear the intersection',
                'correct_answer': 'B',
                'explanation': 'A red traffic light means complete stop. Vehicles must stop before the stop line.',
                'penalty_points': 100,
                'penalty_message': 'Fine Rs. 1,000 for jumping red light'
            },
            {
                'level': 1,
                'question_text': 'What does this sign mean: A triangular sign with red border and white center?',
                'option_a': 'No entry',
                'option_b': 'Stop',
                'option_c': 'Give way/Yield',
                'option_d': 'Speed limit',
                'correct_answer': 'C',
                'explanation': 'Triangular signs with red border indicate "Give Way" - you must yield to other traffic.',
                'penalty_points': 50,
                'penalty_message': 'Fine Rs. 500 for not giving way'
            },
            {
                'level': 1,
                'question_text': 'What does a circular sign with red border and white center with a black symbol mean?',
                'option_a': 'Mandatory instruction',
                'option_b': 'Warning sign',
                'option_c': 'Prohibition sign',
                'option_d': 'Information sign',
                'correct_answer': 'C',
                'explanation': 'Circular signs with red border are prohibition signs - they indicate what is forbidden.',
                'penalty_points': 75,
                'penalty_message': 'Fine Rs. 750 for violating prohibition sign'
            },
            {
                'level': 1,
                'question_text': 'What should you do when you see a yellow traffic light?',
                'option_a': 'Speed up to cross quickly',
                'option_b': 'Stop if safe to do so',
                'option_c': 'Continue at same speed',
                'option_d': 'Honk and proceed',
                'correct_answer': 'B',
                'explanation': 'Yellow light means caution - stop if you can do so safely, otherwise proceed with care.',
                'penalty_points': 50,
                'penalty_message': 'Fine Rs. 500 for improper yellow light behavior'
            }
        ]
        
        # Level 2: Vehicle Documents
        level2_questions = [
            {
                'level': 2,
                'question_text': 'Which document is mandatory to carry while driving?',
                'option_a': 'Aadhaar Card',
                'option_b': 'Driving License',
                'option_c': 'PAN Card',
                'option_d': 'Voter ID',
                'correct_answer': 'B',
                'explanation': 'Valid driving license is mandatory while driving any motor vehicle.',
                'penalty_points': 200,
                'penalty_message': 'Fine Rs. 5,000 for driving without license'
            },
            {
                'level': 2,
                'question_text': 'What is RC in vehicle documents?',
                'option_a': 'Road Certificate',
                'option_b': 'Registration Certificate',
                'option_c': 'Route Card',
                'option_d': 'Repair Certificate',
                'correct_answer': 'B',
                'explanation': 'RC stands for Registration Certificate - proof that your vehicle is registered.',
                'penalty_points': 100,
                'penalty_message': 'Fine Rs. 2,000 for not carrying RC'
            },
            {
                'level': 2,
                'question_text': 'What is PUC certificate?',
                'option_a': 'Personal Use Certificate',
                'option_b': 'Public Utility Certificate',
                'option_c': 'Pollution Under Control Certificate',
                'option_d': 'Purchase Utility Certificate',
                'correct_answer': 'C',
                'explanation': 'PUC certificate ensures your vehicle meets pollution control standards.',
                'penalty_points': 75,
                'penalty_message': 'Fine Rs. 1,000 for invalid PUC certificate'
            },
            {
                'level': 2,
                'question_text': 'How often should you renew your PUC certificate?',
                'option_a': 'Every year',
                'option_b': 'Every 6 months',
                'option_c': 'Every 2 years',
                'option_d': 'Every 3 months',
                'correct_answer': 'B',
                'explanation': 'PUC certificate must be renewed every 6 months to ensure vehicle meets emission standards.',
                'penalty_points': 75,
                'penalty_message': 'Fine Rs. 1,000 for expired PUC certificate'
            }
        ]
        
        # Level 3: Penalties & Fines
        level3_questions = [
            {
                'level': 3,
                'question_text': 'What is the penalty for drunk driving in India?',
                'option_a': 'Rs. 500',
                'option_b': 'Rs. 2,000',
                'option_c': 'Rs. 10,000',
                'option_d': 'Rs. 25,000',
                'correct_answer': 'C',
                'explanation': 'Drunk driving penalty is Rs. 10,000 for first offense and can include imprisonment.',
                'penalty_points': 300,
                'penalty_message': 'Fine Rs. 10,000 for drunk driving - NEVER drink and drive!'
            },
            {
                'level': 3,
                'question_text': 'What is the fine for not wearing a helmet while riding a two-wheeler?',
                'option_a': 'Rs. 100',
                'option_b': 'Rs. 500',
                'option_c': 'Rs. 1,000',
                'option_d': 'Rs. 2,000',
                'correct_answer': 'C',
                'explanation': 'Not wearing helmet attracts a fine of Rs. 1,000 and 3 months license suspension.',
                'penalty_points': 100,
                'penalty_message': 'Fine Rs. 1,000 for not wearing helmet'
            },
            {
                'level': 3,
                'question_text': 'What is the penalty for overspeeding?',
                'option_a': 'Rs. 500-1,000',
                'option_b': 'Rs. 1,000-2,000',
                'option_c': 'Rs. 2,000-4,000',
                'option_d': 'Rs. 5,000-10,000',
                'correct_answer': 'B',
                'explanation': 'Overspeeding penalty ranges from Rs. 1,000 to Rs. 2,000 depending on vehicle type.',
                'penalty_points': 150,
                'penalty_message': 'Fine Rs. 1,000-2,000 for overspeeding'
            },
            {
                'level': 3,
                'question_text': 'What happens if you are caught using mobile phone while driving?',
                'option_a': 'Warning only',
                'option_b': 'Rs. 1,000 fine',
                'option_c': 'Rs. 5,000 fine',
                'option_d': 'License suspension',
                'correct_answer': 'C',
                'explanation': 'Using mobile phone while driving attracts Rs. 5,000 fine for first offense.',
                'penalty_points': 200,
                'penalty_message': 'Fine Rs. 5,000 for using mobile while driving'
            }
        ]
        
        # Level 4: Safety Rules
        level4_questions = [
            {
                'level': 4,
                'question_text': 'What is the minimum following distance you should maintain?',
                'option_a': '1 second',
                'option_b': '2 seconds',
                'option_c': '3 seconds',
                'option_d': '5 seconds',
                'correct_answer': 'C',
                'explanation': 'Maintain at least 3-second following distance to have enough time to react and stop.',
                'penalty_points': 50,
                'penalty_message': 'Fine Rs. 500 for tailgating'
            },
            {
                'level': 4,
                'question_text': 'When should you use indicators?',
                'option_a': 'Only when turning',
                'option_b': 'When changing lanes or turning',
                'option_c': 'Only at traffic signals',
                'option_d': 'Only on highways',
                'correct_answer': 'B',
                'explanation': 'Always use indicators when changing lanes, turning, or changing direction to signal your intention.',
                'penalty_points': 25,
                'penalty_message': 'Fine Rs. 500 for not using indicators'
            },
            {
                'level': 4,
                'question_text': 'What should you do if you see an ambulance with siren behind you?',
                'option_a': 'Continue driving normally',
                'option_b': 'Speed up',
                'option_c': 'Give way immediately',
                'option_d': 'Stop in the middle of road',
                'correct_answer': 'C',
                'explanation': 'Always give way to emergency vehicles like ambulances, fire trucks, and police vehicles.',
                'penalty_points': 100,
                'penalty_message': 'Fine Rs. 2,000 for not giving way to emergency vehicles'
            },
            {
                'level': 4,
                'question_text': 'What is the correct way to overtake another vehicle?',
                'option_a': 'From the left side',
                'option_b': 'From the right side',
                'option_c': 'From either side',
                'option_d': 'Overtaking is not allowed',
                'correct_answer': 'B',
                'explanation': 'Always overtake from the right side after ensuring it is safe and using proper signals.',
                'penalty_points': 75,
                'penalty_message': 'Fine Rs. 1,000 for wrong-side overtaking'
            }
        ]
        
        # Add all questions to database
        all_questions = level1_questions + level2_questions + level3_questions + level4_questions
        
        for q_data in all_questions:
            question = Question(**q_data)
            db.session.add(question)
        
        # Add badges
        badges = [
            {
                'name': 'Sign Master',
                'description': 'Completed Traffic Signs level',
                'icon': '🚦',
                'level_required': 1
            },
            {
                'name': 'Document Expert',
                'description': 'Completed Vehicle Documents level',
                'icon': '📄',
                'level_required': 2
            },
            {
                'name': 'Law Enforcer',
                'description': 'Completed Penalties & Fines level',
                'icon': '⚖️',
                'level_required': 3
            },
            {
                'name': 'Safety Champion',
                'description': 'Completed Safety Rules level',
                'icon': '🛡️',
                'level_required': 4
            }
        ]
        
        for badge_data in badges:
            badge = Badge(**badge_data)
            db.session.add(badge)
        
        db.session.commit()
        print("Database seeded successfully!")

if __name__ == '__main__':
    seed_database()