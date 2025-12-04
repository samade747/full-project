// src/components/ChapterTools/ChapterToolbar.tsx
import React from 'react';
import PersonalizeButton from './PersonalizeButton';
import TranslateButton from './TranslateButton';

interface ChapterToolbarProps {
    chapterContent: string;
}

/**
 * Combined toolbar with Personalize and Translate buttons for chapters
 */
const ChapterToolbar: React.FC<ChapterToolbarProps> = ({ chapterContent }) => {
    return (
        <div className="chapter-toolbar" style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem',
            padding: '1rem',
            backgroundColor: 'var(--ifm-background-surface-color, #f8fafc)',
            borderRadius: '12px',
            border: '1px solid var(--ifm-color-emphasis-200, #e2e8f0)'
        }}>
            <div style={{ flex: '1 1 300px' }}>
                <PersonalizeButton chapterContent={chapterContent} />
            </div>
            <div style={{ flex: '1 1 300px' }}>
                <TranslateButton chapterContent={chapterContent} />
            </div>
        </div>
    );
};

export default ChapterToolbar;
