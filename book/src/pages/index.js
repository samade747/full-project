import React, {useEffect} from 'react';

export default function Home() {
  useEffect(() => {
    // Load ChatKit web component script and initialize session
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@openai/chatkit-js/dist/chatkit.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = async () => {
      try {
        const res = await fetch('/api/chatkit/session', { method: 'POST' });
        const data = await res.json();
        // data should include client_secret and session info per OpenAI ChatKit sessions API
        const clientSecret = data.client_secret || data.client?.client_secret || data?.client?.client_secret;
        // Create chat element
        const el = document.createElement('openai-chatkit');
        el.setAttribute('client-secret', clientSecret);
        el.style.height = '600px';
        document.getElementById('chat-root').appendChild(el);
      } catch (e) {
        console.error('ChatKit init failed', e);
      }
    };
  }, []);

  return (
    <div style={{padding: 40}}>
      <h1>Calcu Book - RAG Chatbot Demo</h1>
      <div id="chat-root" />
      <p>Highlight text on any doc page and click "Ask selected" to query selection-only mode.</p>
    </div>
  );
}
