// src/components/ChapterTools/PersonalizeButton.tsx
import React, { useState } from 'react';

interface UserPreferences {
    level: string;
    languages: string[];
    aiExperience: string;
    hardwareKnowledge: string;
}

interface PersonalizeButtonProps {
    chapterContent: string;
    onPersonalized?: (content: string) => void;
}

const PersonalizeButton: React.FC<PersonalizeButtonProps> = ({
    chapterContent,
    onPersonalized
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [personalizedContent, setPersonalizedContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    // Get user preferences from localStorage (set during signup)
    const getUserPreferences = (): UserPreferences => {
        try {
            const stored = localStorage.getItem('userPreferences');
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.error('Error reading preferences:', e);
        }
        // Default preferences
        return {
            level: 'intermediate',
            languages: ['Python'],
            aiExperience: 'basic',
            hardwareKnowledge: 'basic'
        };
    };

    const handlePersonalize = async () => {
        if (personalizedContent) {
            // Toggle view
            setIsExpanded(!isExpanded);
            return;
        }

        setIsLoading(true);
        setError(null);

        const preferences = getUserPreferences();
        const backendUrl = (window as any).BACKEND_API_URL || 'http://localhost:8000';

        try {
            const response = await fetch(`${backendUrl}/api/personalize`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: chapterContent,
                    preferences
                })
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                setPersonalizedContent(data.content);
                setIsExpanded(true);
                if (onPersonalized) {
                    onPersonalized(data.content);
                }
            }
        } catch (e) {
            setError('Failed to personalize content. Please try again.');
            console.error('Personalization error:', e);
        } finally {
            setIsLoading(false);
        }
    };

    const getLevelEmoji = () => {
        const prefs = getUserPreferences();
        switch (prefs.level) {
            case 'beginner': return '🌱';
            case 'advanced': return '🚀';
            default: return '📚';
        }
    };

    return (
        <div className="personalize-container" style={{
            margin: '1rem 0',
            padding: '1rem',
            backgroundColor: 'var(--ifm-background-surface-color, #f5f5f5)',
            borderRadius: '8px',
            border: '1px solid var(--ifm-color-emphasis-300, #ddd)'
        }}>
            <button
                onClick={handlePersonalize}
                disabled={isLoading}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: isExpanded ? '#10b981' : '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: isLoading ? 'wait' : 'pointer',
                    fontSize: '1rem',
                    fontWeight: 600,
                    transition: 'all 0.2s ease'
                }}
            >
                {isLoading ? (
                    <>
                        <span className="spinner">⏳</span>
                        Personalizing...
                    </>
                ) : personalizedContent ? (
                    <>
                        {getLevelEmoji()} {isExpanded ? 'Hide Personalized Version' : 'Show Personalized Version'}
                    </>
                ) : (
                    <>
                        🎯 Personalize for My Level
                    </>
                )}
            </button>

            {error && (
                <p style={{ color: '#ef4444', marginTop: '0.5rem' }}>
                    ⚠️ {error}
                </p>
            )}

            {isExpanded && personalizedContent && (
                <div
                    className="personalized-content"
                    style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        backgroundColor: 'var(--ifm-background-color, white)',
                        borderRadius: '6px',
                        border: '2px solid #10b981'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.75rem',
                        color: '#10b981',
                        fontWeight: 600
                    }}>
                        ✨ Personalized for your level
                    </div>
                    <div
                        className="markdown-content"
                        dangerouslySetInnerHTML={{ __html: personalizedContent }}
                    />
                </div>
            )}
        </div>
    );
};

export default PersonalizeButton;
