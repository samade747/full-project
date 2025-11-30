// frontend/src/theme/DocItem/Layout/index.tsx
import React from 'react';
import ContentWrapper from '../../../components/ContentWrapper';

export default function DocItemLayout(props) {
  const { children } = props;
  return (
    <ContentWrapper>
      {children}
    </ContentWrapper>
  );
}