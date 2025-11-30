# backend/src/services/user_service.py

from typing import Optional
from uuid import UUID, uuid4
from models.user import UserInDB
from database.db import get_db_connection

def get_user_by_email(email: str) -> Optional[UserInDB]:
    """Get user from database by email"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT user_id, email, name, hashed_password, 
               level, languages, ai_experience, hardware_knowledge
        FROM users WHERE email = %s
    """, (email,))
    
    row = cursor.fetchone()
    cursor.close()
    conn.close()
    
    if not row:
        return None
    
    # Convert database row to UserInDB model
    from src.models.user import UserPreferences
    
    user = UserInDB(
        userId=row['user_id'],
        email=row['email'],
        name=row['name'],
        hashed_password=row['hashed_password'],
        preferences=UserPreferences(
            level=row['level'],
            languages=row['languages'] or [],
            aiExperience=row['ai_experience'],
            hardwareKnowledge=row['hardware_knowledge']
        )
    )
    
    return user

def create_user(user: UserInDB) -> UserInDB:
    """Create new user in database"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Generate UUID if not provided
    if not user.userId:
        user.userId = uuid4()
    
    try:
        cursor.execute("""
            INSERT INTO users (
                user_id, email, name, hashed_password,
                level, languages, ai_experience, hardware_knowledge
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING user_id
        """, (
            str(user.userId),
            user.email,
            user.name,
            user.hashed_password,
            user.preferences.level,
            user.preferences.languages,
            user.preferences.aiExperience,
            user.preferences.hardwareKnowledge
        ))
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return user
        
    except Exception as e:
        conn.rollback()
        cursor.close()
        conn.close()
        print(f"Error creating user: {e}")
        return None

def get_user_by_id(user_id: UUID) -> Optional[UserInDB]:
    """Get user by ID"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT user_id, email, name, hashed_password,
               level, languages, ai_experience, hardware_knowledge
        FROM users WHERE user_id = %s
    """, (str(user_id),))
    
    row = cursor.fetchone()
    cursor.close()
    conn.close()
    
    if not row:
        return None
    
    from src.models.user import UserPreferences
    
    return UserInDB(
        userId=row['user_id'],
        email=row['email'],
        name=row['name'],
        hashed_password=row['hashed_password'],
        preferences=UserPreferences(
            level=row['level'],
            languages=row['languages'] or [],
            aiExperience=row['ai_experience'],
            hardwareKnowledge=row['hardware_knowledge']
        )
    )