// src/components/ChapterTools/TranslateButton.tsx
import React, { useState } from 'react';

interface TranslateButtonProps {
    chapterContent: string;
    onTranslated?: (content: string, direction: string) => void;
}

const TranslateButton: React.FC<TranslateButtonProps> = ({
    chapterContent,
    onTranslated
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [translatedContent, setTranslatedContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

    const handleTranslate = async () => {
        if (translatedContent) {
            // Toggle view
            setIsExpanded(!isExpanded);
            return;
        }

        setIsLoading(true);
        setError(null);

        const backendUrl = (window as any).BACKEND_API_URL || 'http://localhost:8000';

        try {
            const response = await fetch(`${backendUrl}/api/translate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: chapterContent,
                    target_language: 'ur'  // Urdu
                })
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                setTranslatedContent(data.content);
                setDirection(data.direction === 'rtl' ? 'rtl' : 'ltr');
                setIsExpanded(true);
                if (onTranslated) {
                    onTranslated(data.content, data.direction);
                }
            }
        } catch (e) {
            setError('ترجمہ ناکام ہو گیا۔ دوبارہ کوشش کریں۔');
            console.error('Translation error:', e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="translate-container" style={{
            margin: '1rem 0',
            padding: '1rem',
            backgroundColor: 'var(--ifm-background-surface-color, #f5f5f5)',
            borderRadius: '8px',
            border: '1px solid var(--ifm-color-emphasis-300, #ddd)'
        }}>
            <button
                onClick={handleTranslate}
                disabled={isLoading}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: isExpanded ? '#059669' : '#10b981',
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
                        ترجمہ ہو رہا ہے...
                    </>
                ) : translatedContent ? (
                    <>
                        🇵🇰 {isExpanded ? 'اردو ترجمہ چھپائیں' : 'اردو ترجمہ دکھائیں'}
                    </>
                ) : (
                    <>
                        🇵🇰 ترجمہ (Urdu)
                    </>
                )}
            </button>

            {error && (
                <p style={{ color: '#ef4444', marginTop: '0.5rem', direction: 'rtl' }}>
                    ⚠️ {error}
                </p>
            )}

            {isExpanded && translatedContent && (
                <div
                    className="translated-content"
                    style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        backgroundColor: 'var(--ifm-background-color, white)',
                        borderRadius: '6px',
                        border: '2px solid #059669',
                        direction: direction,
                        textAlign: direction === 'rtl' ? 'right' : 'left',
                        fontFamily: direction === 'rtl' ? '"Noto Nastaliq Urdu", "Jameel Noori Nastaleeq", serif' : 'inherit'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.75rem',
                        color: '#059669',
                        fontWeight: 600,
                        justifyContent: direction === 'rtl' ? 'flex-end' : 'flex-start'
                    }}>
                        🇵🇰 اردو ترجمہ
                    </div>
                    <div
                        className="markdown-content urdu-content"
                        style={{
                            lineHeight: 1.8,
                            fontSize: '1.1rem'
                        }}
                        dangerouslySetInnerHTML={{ __html: translatedContent }}
                    />
                </div>
            )}

            {/* Add Urdu font from Google Fonts */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
        
        .urdu-content {
          font-family: 'Noto Nastaliq Urdu', serif;
        }
        
        .urdu-content code,
        .urdu-content pre {
          direction: ltr;
          text-align: left;
          font-family: 'Fira Code', monospace;
        }
      `}</style>
        </div>
    );
};

export default TranslateButton;
