// src/theme/MDXComponents.tsx
import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import PersonalizeButton from '@site/src/components/ChapterTools/PersonalizeButton';
import TranslateButton from '@site/src/components/ChapterTools/TranslateButton';
import ChapterToolbar from '@site/src/components/ChapterTools/ChapterToolbar';

export default {
    ...MDXComponents,
    PersonalizeButton,
    TranslateButton,
    ChapterToolbar,
};
