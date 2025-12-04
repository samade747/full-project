# backend/app/services/user_service.py

from typing import Optional
from uuid import UUID, uuid4
from app.models.user import UserInDB
from app.database.db import get_db_connection

def get_user_by_email(email: str) -> Optional[UserInDB]:
    """Get user from database by email"""
    conn = get_db_connection()
    if not conn:
        print("Database not available - cannot get user")
        return None
    
    try:
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
        from app.models.user import UserPreferences
        
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
    except Exception as e:
        print(f"Error getting user by email: {e}")
        return None

def create_user(user: UserInDB) -> Optional[UserInDB]:
    """Create new user in database"""
    conn = get_db_connection()
    if not conn:
        print("Database not available - cannot create user")
        return None
    
    # Generate UUID if not provided
    if not user.userId:
        user.userId = uuid4()
    
    try:
        cursor = conn.cursor()
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
        conn.close()
        print(f"Error creating user: {e}")
        return None

def get_user_by_id(user_id: UUID) -> Optional[UserInDB]:
    """Get user by ID"""
    conn = get_db_connection()
    if not conn:
        print("Database not available - cannot get user")
        return None
    
    try:
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
        
        from app.models.user import UserPreferences
        
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
    except Exception as e:
        print(f"Error getting user by id: {e}")
        return None