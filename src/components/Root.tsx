// frontend/src/components/Root.tsx (Create this file if not exists)
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Root({children}) {
  const {siteConfig} = useDocusaurusContext();
  
  // Inject API key into window for client-side use
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).GEMINI_API_KEY = siteConfig.customFields?.geminiApiKey;
    }
  }, [siteConfig]);

  return <>{children}</>;
}